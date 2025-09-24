import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResponseDto, PaginatedUserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.database.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.database.user.create({
      data: createUserDto,
      include: {
        _count: {
          select: { recipes: true },
        },
      },
    });

    return this.formatUserResponse(user);
  }

  async findAll(queryDto: QueryUserDto): Promise<PaginatedUserResponseDto> {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.database.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          _count: {
            select: { recipes: true },
          },
        },
      }),
      this.database.user.count({ where }),
    ]);

    const formattedUsers = users.map(user => this.formatUserResponse(user));

    return {
      users: formattedUsers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.database.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: { recipes: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.formatUserResponse(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.database.user.findUnique({
      where: { email },
      include: {
        _count: {
          select: { recipes: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.formatUserResponse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.database.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.email) {
      const emailExists = await this.database.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already in use');
      }
    }

    const updatedUser = await this.database.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        _count: {
          select: { recipes: true },
        },
      },
    });

    return this.formatUserResponse(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.database.user.delete({
      where: { id },
    });
  }

  private formatUserResponse(user: any): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      _count: user._count,
    };
  }
}