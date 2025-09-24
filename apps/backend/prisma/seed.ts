import { PrismaClient, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    email: 'chef@example.com',
    name: 'Chef Antonio',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
  {
    email: 'baker@example.com',
    name: 'Baker Sarah',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b692?w=150',
  },
  {
    email: 'cook@example.com',
    name: 'Home Cook Mike',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
];

const categories = [
  { name: 'Italian', description: 'Traditional Italian cuisine' },
  { name: 'Desserts', description: 'Sweet treats and desserts' },
  { name: 'Breakfast', description: 'Morning meals and brunches' },
  { name: 'Vegetarian', description: 'Plant-based dishes' },
  { name: 'Quick & Easy', description: 'Recipes ready in 30 minutes or less' },
  { name: 'Comfort Food', description: 'Hearty, satisfying dishes' },
  { name: 'Healthy', description: 'Nutritious and wholesome meals' },
  { name: 'Asian', description: 'Asian-inspired cuisine' },
  { name: 'Mexican', description: 'Mexican and Latin American dishes' },
  { name: 'Seafood', description: 'Fish and shellfish recipes' },
];

const ingredients = [
  { name: 'Pasta', description: 'Various pasta shapes' },
  { name: 'Tomatoes', description: 'Fresh or canned tomatoes' },
  { name: 'Garlic', description: 'Fresh garlic cloves' },
  { name: 'Onion', description: 'Yellow or white onions' },
  { name: 'Olive Oil', description: 'Extra virgin olive oil' },
  { name: 'Basil', description: 'Fresh basil leaves' },
  { name: 'Mozzarella', description: 'Fresh mozzarella cheese' },
  { name: 'Parmesan', description: 'Grated Parmesan cheese' },
  { name: 'Chicken', description: 'Boneless chicken breast or thighs' },
  { name: 'Rice', description: 'Long grain white rice' },
  { name: 'Eggs', description: 'Large eggs' },
  { name: 'Flour', description: 'All-purpose flour' },
  { name: 'Sugar', description: 'Granulated white sugar' },
  { name: 'Butter', description: 'Unsalted butter' },
  { name: 'Milk', description: 'Whole milk' },
  { name: 'Bell Peppers', description: 'Red, yellow, or green bell peppers' },
  { name: 'Mushrooms', description: 'Button or cremini mushrooms' },
  { name: 'Spinach', description: 'Fresh baby spinach' },
  { name: 'Lemon', description: 'Fresh lemons' },
  { name: 'Salmon', description: 'Fresh salmon fillets' },
  { name: 'Avocado', description: 'Ripe avocados' },
  { name: 'Black Beans', description: 'Canned or dried black beans' },
  { name: 'Cilantro', description: 'Fresh cilantro leaves' },
  { name: 'Lime', description: 'Fresh limes' },
  { name: 'Coconut Milk', description: 'Canned coconut milk' },
  { name: 'Ginger', description: 'Fresh ginger root' },
  { name: 'Soy Sauce', description: 'Dark soy sauce' },
  { name: 'Honey', description: 'Pure honey' },
  { name: 'Vanilla', description: 'Pure vanilla extract' },
  { name: 'Chocolate', description: 'Dark chocolate or cocoa powder' },
];

const recipes = [
  {
    title: 'Classic Spaghetti Carbonara',
    description: 'Traditional Italian pasta dish with eggs, cheese, and pancetta',
    instructions: [
      'Cook spaghetti in salted boiling water until al dente',
      'While pasta cooks, whisk eggs with grated Parmesan and black pepper',
      'Cook pancetta until crispy in a large pan',
      'Drain pasta, reserving some pasta water',
      'Quickly toss hot pasta with egg mixture and pancetta',
      'Add pasta water if needed to create a creamy sauce',
      'Serve immediately with extra Parmesan'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    categories: ['Italian'],
    ingredients: [
      { name: 'Pasta', quantity: '400', unit: 'g' },
      { name: 'Eggs', quantity: '3', unit: 'large' },
      { name: 'Parmesan', quantity: '100', unit: 'g' },
    ]
  },
  {
    title: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    instructions: [
      'Preheat oven to 475°F (245°C)',
      'Roll out pizza dough on floured surface',
      'Spread tomato sauce evenly on dough',
      'Add torn mozzarella pieces',
      'Bake for 12-15 minutes until crust is golden',
      'Top with fresh basil leaves',
      'Drizzle with olive oil before serving'
    ],
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    difficulty: Difficulty.EASY,
    categories: ['Italian', 'Vegetarian'],
    ingredients: [
      { name: 'Flour', quantity: '300', unit: 'g' },
      { name: 'Tomatoes', quantity: '400', unit: 'g' },
      { name: 'Mozzarella', quantity: '200', unit: 'g' },
      { name: 'Basil', quantity: '1', unit: 'bunch' },
    ]
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Soft and chewy homemade chocolate chip cookies',
    instructions: [
      'Preheat oven to 350°F (175°C)',
      'Cream butter and sugars until light and fluffy',
      'Beat in eggs and vanilla extract',
      'Mix in flour, baking soda, and salt',
      'Fold in chocolate chips',
      'Drop spoonfuls onto baking sheets',
      'Bake 9-11 minutes until edges are golden',
      'Cool on baking sheet for 5 minutes before transferring'
    ],
    prepTime: 15,
    cookTime: 11,
    servings: 24,
    difficulty: Difficulty.EASY,
    categories: ['Desserts'],
    ingredients: [
      { name: 'Flour', quantity: '2.25', unit: 'cups' },
      { name: 'Butter', quantity: '1', unit: 'cup' },
      { name: 'Sugar', quantity: '1', unit: 'cup' },
      { name: 'Eggs', quantity: '2', unit: 'large' },
      { name: 'Chocolate', quantity: '2', unit: 'cups' },
    ]
  },
  {
    title: 'Chicken Fried Rice',
    description: 'Quick and easy fried rice with chicken and vegetables',
    instructions: [
      'Cook rice according to package instructions and let cool',
      'Heat oil in a large wok or skillet',
      'Scramble eggs and set aside',
      'Cook diced chicken until golden brown',
      'Add vegetables and stir-fry for 2-3 minutes',
      'Add cold rice and break up any clumps',
      'Stir in soy sauce and scrambled eggs',
      'Cook until heated through and serve hot'
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: Difficulty.EASY,
    categories: ['Asian', 'Quick & Easy'],
    ingredients: [
      { name: 'Rice', quantity: '2', unit: 'cups' },
      { name: 'Chicken', quantity: '300', unit: 'g' },
      { name: 'Eggs', quantity: '2', unit: 'large' },
      { name: 'Soy Sauce', quantity: '3', unit: 'tbsp' },
    ]
  },
  {
    title: 'Greek Salad',
    description: 'Fresh Mediterranean salad with feta cheese and olives',
    instructions: [
      'Chop tomatoes, cucumber, and red onion into chunks',
      'Add to a large bowl with bell pepper strips',
      'Crumble feta cheese over vegetables',
      'Add Kalamata olives',
      'Drizzle with olive oil and lemon juice',
      'Season with oregano, salt, and pepper',
      'Toss gently and serve immediately'
    ],
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    difficulty: Difficulty.EASY,
    categories: ['Vegetarian', 'Healthy', 'Quick & Easy'],
    ingredients: [
      { name: 'Tomatoes', quantity: '4', unit: 'large' },
      { name: 'Bell Peppers', quantity: '1', unit: 'large' },
      { name: 'Onion', quantity: '1', unit: 'small' },
      { name: 'Lemon', quantity: '1', unit: 'large' },
    ]
  },
  {
    title: 'Beef Tacos',
    description: 'Flavorful ground beef tacos with fresh toppings',
    instructions: [
      'Heat oil in a large skillet over medium heat',
      'Cook ground beef until browned, breaking it up',
      'Add onion and garlic, cook until softened',
      'Season with cumin, chili powder, and salt',
      'Warm tortillas in a dry skillet or microwave',
      'Fill tortillas with beef mixture',
      'Top with lettuce, tomatoes, cheese, and avocado',
      'Serve with lime wedges and cilantro'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: Difficulty.EASY,
    categories: ['Mexican', 'Quick & Easy'],
    ingredients: [
      { name: 'Chicken', quantity: '500', unit: 'g' },
      { name: 'Onion', quantity: '1', unit: 'medium' },
      { name: 'Tomatoes', quantity: '2', unit: 'medium' },
      { name: 'Avocado', quantity: '1', unit: 'large' },
      { name: 'Cilantro', quantity: '1', unit: 'bunch' },
      { name: 'Lime', quantity: '2', unit: 'pieces' },
    ]
  },
  {
    title: 'Salmon Teriyaki',
    description: 'Glazed salmon with sweet and savory teriyaki sauce',
    instructions: [
      'Pat salmon fillets dry and season with salt and pepper',
      'Heat oil in a large skillet over medium-high heat',
      'Cook salmon skin-side up for 4-5 minutes',
      'Flip and cook for another 3-4 minutes',
      'Mix soy sauce, honey, ginger, and garlic for sauce',
      'Pour sauce over salmon and simmer until thickened',
      'Serve over rice with steamed vegetables'
    ],
    prepTime: 10,
    cookTime: 12,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    categories: ['Seafood', 'Asian', 'Healthy'],
    ingredients: [
      { name: 'Salmon', quantity: '4', unit: 'fillets' },
      { name: 'Soy Sauce', quantity: '1/4', unit: 'cup' },
      { name: 'Honey', quantity: '2', unit: 'tbsp' },
      { name: 'Ginger', quantity: '1', unit: 'tbsp' },
      { name: 'Garlic', quantity: '2', unit: 'cloves' },
    ]
  },
  {
    title: 'Vegetable Stir Fry',
    description: 'Colorful mixed vegetable stir fry with ginger-soy sauce',
    instructions: [
      'Prepare all vegetables by cutting into uniform sizes',
      'Heat oil in a wok or large skillet over high heat',
      'Add harder vegetables first (carrots, broccoli)',
      'Stir-fry for 2-3 minutes, then add softer vegetables',
      'Add minced ginger and garlic, cook for 30 seconds',
      'Pour in soy sauce and toss everything together',
      'Cook until vegetables are tender-crisp',
      'Serve immediately over rice'
    ],
    prepTime: 15,
    cookTime: 8,
    servings: 4,
    difficulty: Difficulty.EASY,
    categories: ['Vegetarian', 'Asian', 'Healthy', 'Quick & Easy'],
    ingredients: [
      { name: 'Bell Peppers', quantity: '2', unit: 'large' },
      { name: 'Mushrooms', quantity: '200', unit: 'g' },
      { name: 'Spinach', quantity: '100', unit: 'g' },
      { name: 'Ginger', quantity: '1', unit: 'tbsp' },
      { name: 'Soy Sauce', quantity: '3', unit: 'tbsp' },
    ]
  },
  {
    title: 'Pancakes',
    description: 'Fluffy breakfast pancakes perfect for weekend mornings',
    instructions: [
      'Mix flour, sugar, baking powder, and salt in a large bowl',
      'In another bowl, whisk milk, egg, and melted butter',
      'Pour wet ingredients into dry ingredients',
      'Stir just until combined (lumps are okay)',
      'Heat griddle or skillet over medium heat',
      'Pour 1/4 cup batter for each pancake',
      'Cook until bubbles form on surface, then flip',
      'Cook until golden brown and serve with syrup'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: Difficulty.EASY,
    categories: ['Breakfast', 'Quick & Easy'],
    ingredients: [
      { name: 'Flour', quantity: '2', unit: 'cups' },
      { name: 'Sugar', quantity: '2', unit: 'tbsp' },
      { name: 'Milk', quantity: '1.5', unit: 'cups' },
      { name: 'Eggs', quantity: '1', unit: 'large' },
      { name: 'Butter', quantity: '3', unit: 'tbsp' },
    ]
  },
  {
    title: 'Thai Green Curry',
    description: 'Aromatic Thai curry with coconut milk and vegetables',
    instructions: [
      'Heat oil in a large pot over medium heat',
      'Add green curry paste and cook for 1 minute',
      'Pour in half of the coconut milk and stir',
      'Add chicken and cook until no longer pink',
      'Add remaining coconut milk and vegetables',
      'Simmer for 15-20 minutes until vegetables are tender',
      'Season with fish sauce and palm sugar',
      'Garnish with Thai basil and serve over rice'
    ],
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    categories: ['Asian', 'Comfort Food'],
    ingredients: [
      { name: 'Coconut Milk', quantity: '400', unit: 'ml' },
      { name: 'Chicken', quantity: '500', unit: 'g' },
      { name: 'Bell Peppers', quantity: '2', unit: 'medium' },
      { name: 'Basil', quantity: '1', unit: 'bunch' },
    ]
  },
  {
    title: 'Caesar Salad',
    description: 'Classic Caesar salad with homemade dressing and croutons',
    instructions: [
      'Make croutons by toasting cubed bread with olive oil',
      'Wash and chop romaine lettuce into bite-sized pieces',
      'Make dressing with anchovies, garlic, lemon juice, and egg',
      'Whisk in olive oil slowly to emulsify',
      'Toss lettuce with dressing until well coated',
      'Add grated Parmesan cheese and croutons',
      'Serve immediately with extra Parmesan'
    ],
    prepTime: 20,
    cookTime: 10,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    categories: ['Healthy', 'Quick & Easy'],
    ingredients: [
      { name: 'Parmesan', quantity: '100', unit: 'g' },
      { name: 'Lemon', quantity: '1', unit: 'large' },
      { name: 'Garlic', quantity: '2', unit: 'cloves' },
      { name: 'Olive Oil', quantity: '1/2', unit: 'cup' },
    ]
  },
  {
    title: 'Mushroom Risotto',
    description: 'Creamy Italian rice dish with wild mushrooms',
    instructions: [
      'Heat stock in a saucepan and keep warm',
      'Sauté mushrooms until golden, set aside',
      'In same pan, cook onion until translucent',
      'Add rice and stir for 2 minutes until coated',
      'Add wine and stir until absorbed',
      'Add warm stock one ladle at a time, stirring constantly',
      'Continue until rice is creamy and al dente (about 20 minutes)',
      'Stir in mushrooms, butter, and Parmesan',
      'Season and serve immediately'
    ],
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    difficulty: Difficulty.HARD,
    categories: ['Italian', 'Vegetarian', 'Comfort Food'],
    ingredients: [
      { name: 'Rice', quantity: '350', unit: 'g' },
      { name: 'Mushrooms', quantity: '300', unit: 'g' },
      { name: 'Onion', quantity: '1', unit: 'medium' },
      { name: 'Parmesan', quantity: '100', unit: 'g' },
      { name: 'Butter', quantity: '50', unit: 'g' },
    ]
  },
  {
    title: 'Black Bean Burrito Bowl',
    description: 'Healthy bowl with black beans, rice, and fresh toppings',
    instructions: [
      'Cook rice according to package instructions',
      'Heat black beans with cumin and garlic powder',
      'Prepare fresh salsa with tomatoes, onion, and cilantro',
      'Make guacamole with mashed avocado and lime',
      'Layer rice in bowls as base',
      'Top with black beans, salsa, and guacamole',
      'Add corn, lettuce, and cheese if desired',
      'Serve with lime wedges'
    ],
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: Difficulty.EASY,
    categories: ['Mexican', 'Vegetarian', 'Healthy'],
    ingredients: [
      { name: 'Rice', quantity: '1', unit: 'cup' },
      { name: 'Black Beans', quantity: '400', unit: 'g' },
      { name: 'Avocado', quantity: '2', unit: 'large' },
      { name: 'Tomatoes', quantity: '3', unit: 'medium' },
      { name: 'Cilantro', quantity: '1', unit: 'bunch' },
      { name: 'Lime', quantity: '2', unit: 'pieces' },
    ]
  },
  {
    title: 'Lemon Garlic Shrimp',
    description: 'Quick and flavorful shrimp sautéed with lemon and garlic',
    instructions: [
      'Pat shrimp dry and season with salt and pepper',
      'Heat olive oil in a large skillet over medium-high heat',
      'Add minced garlic and cook for 30 seconds',
      'Add shrimp and cook for 2-3 minutes per side',
      'Add lemon juice, butter, and red pepper flakes',
      'Toss until shrimp is coated in sauce',
      'Garnish with fresh parsley',
      'Serve over pasta or with crusty bread'
    ],
    prepTime: 10,
    cookTime: 8,
    servings: 4,
    difficulty: Difficulty.EASY,
    categories: ['Seafood', 'Quick & Easy'],
    ingredients: [
      { name: 'Garlic', quantity: '4', unit: 'cloves' },
      { name: 'Lemon', quantity: '2', unit: 'large' },
      { name: 'Olive Oil', quantity: '3', unit: 'tbsp' },
      { name: 'Butter', quantity: '2', unit: 'tbsp' },
    ]
  },
  {
    title: 'Spinach and Feta Quiche',
    description: 'Savory pie with spinach, feta cheese, and eggs',
    instructions: [
      'Preheat oven to 375°F (190°C)',
      'Roll out pastry and line a 9-inch pie dish',
      'Sauté spinach until wilted, then drain excess water',
      'Beat eggs with milk, salt, and pepper',
      'Spread spinach and crumbled feta in pastry shell',
      'Pour egg mixture over filling',
      'Bake for 35-40 minutes until set and golden',
      'Cool for 10 minutes before slicing'
    ],
    prepTime: 20,
    cookTime: 40,
    servings: 8,
    difficulty: Difficulty.MEDIUM,
    categories: ['Vegetarian', 'Breakfast'],
    ingredients: [
      { name: 'Eggs', quantity: '6', unit: 'large' },
      { name: 'Spinach', quantity: '300', unit: 'g' },
      { name: 'Milk', quantity: '1', unit: 'cup' },
      { name: 'Flour', quantity: '200', unit: 'g' },
      { name: 'Butter', quantity: '100', unit: 'g' },
    ]
  },
  {
    title: 'Beef Stew',
    description: 'Hearty slow-cooked stew with tender beef and vegetables',
    instructions: [
      'Cut beef into 2-inch chunks and season with salt and pepper',
      'Heat oil in a large Dutch oven over medium-high heat',
      'Brown beef on all sides, working in batches',
      'Add onion, carrots, and celery, cook until softened',
      'Add garlic, tomato paste, and herbs',
      'Pour in beef stock and bring to a simmer',
      'Cover and cook for 1.5-2 hours until beef is tender',
      'Add potatoes in the last 30 minutes',
      'Thicken with flour mixture if desired'
    ],
    prepTime: 20,
    cookTime: 120,
    servings: 6,
    difficulty: Difficulty.MEDIUM,
    categories: ['Comfort Food'],
    ingredients: [
      { name: 'Onion', quantity: '2', unit: 'large' },
      { name: 'Garlic', quantity: '4', unit: 'cloves' },
      { name: 'Flour', quantity: '2', unit: 'tbsp' },
    ]
  },
  {
    title: 'Banana Bread',
    description: 'Moist and flavorful bread made with overripe bananas',
    instructions: [
      'Preheat oven to 350°F (175°C) and grease a loaf pan',
      'Mash ripe bananas in a large bowl',
      'Mix in melted butter, sugar, egg, and vanilla',
      'In separate bowl, combine flour, baking soda, and salt',
      'Fold dry ingredients into banana mixture until just combined',
      'Pour batter into prepared loaf pan',
      'Bake for 55-65 minutes until toothpick comes out clean',
      'Cool in pan for 10 minutes before turning out'
    ],
    prepTime: 15,
    cookTime: 60,
    servings: 10,
    difficulty: Difficulty.EASY,
    categories: ['Desserts', 'Breakfast'],
    ingredients: [
      { name: 'Flour', quantity: '1.5', unit: 'cups' },
      { name: 'Sugar', quantity: '3/4', unit: 'cup' },
      { name: 'Butter', quantity: '1/3', unit: 'cup' },
      { name: 'Eggs', quantity: '1', unit: 'large' },
      { name: 'Vanilla', quantity: '1', unit: 'tsp' },
    ]
  },
  {
    title: 'Chicken Tikka Masala',
    description: 'Creamy Indian curry with marinated chicken in tomato sauce',
    instructions: [
      'Marinate chicken in yogurt and spices for at least 1 hour',
      'Cook chicken in a hot skillet until charred and cooked through',
      'In same pan, sauté onion, garlic, and ginger until fragrant',
      'Add tomato sauce, cream, and spices',
      'Simmer sauce for 10 minutes until thickened',
      'Add cooked chicken back to sauce',
      'Simmer for 5 more minutes to heat through',
      'Garnish with cilantro and serve with rice'
    ],
    prepTime: 70,
    cookTime: 25,
    servings: 4,
    difficulty: Difficulty.MEDIUM,
    categories: ['Asian', 'Comfort Food'],
    ingredients: [
      { name: 'Chicken', quantity: '600', unit: 'g' },
      { name: 'Tomatoes', quantity: '400', unit: 'g' },
      { name: 'Onion', quantity: '1', unit: 'large' },
      { name: 'Garlic', quantity: '4', unit: 'cloves' },
      { name: 'Ginger', quantity: '2', unit: 'tbsp' },
      { name: 'Cilantro', quantity: '1', unit: 'bunch' },
    ]
  },
  {
    title: 'Apple Pie',
    description: 'Classic American apple pie with flaky crust and cinnamon',
    instructions: [
      'Make pastry dough and chill for at least 1 hour',
      'Peel and slice apples, toss with sugar, cinnamon, and flour',
      'Roll out bottom crust and line pie dish',
      'Fill with apple mixture and dot with butter',
      'Roll out top crust and place over filling',
      'Seal edges and cut vents in top crust',
      'Brush with egg wash and sprinkle with sugar',
      'Bake at 425°F for 15 minutes, then 350°F for 35-45 minutes',
      'Cool completely before serving'
    ],
    prepTime: 30,
    cookTime: 60,
    servings: 8,
    difficulty: Difficulty.HARD,
    categories: ['Desserts'],
    ingredients: [
      { name: 'Flour', quantity: '2.5', unit: 'cups' },
      { name: 'Butter', quantity: '1', unit: 'cup' },
      { name: 'Sugar', quantity: '3/4', unit: 'cup' },
      { name: 'Eggs', quantity: '1', unit: 'large' },
    ]
  },
  {
    title: 'Mediterranean Quinoa Salad',
    description: 'Light and refreshing salad with quinoa and Mediterranean flavors',
    instructions: [
      'Cook quinoa according to package instructions and cool',
      'Dice cucumber, tomatoes, and red onion',
      'Crumble feta cheese and chop fresh herbs',
      'Make dressing with lemon juice, olive oil, and oregano',
      'Combine quinoa with vegetables and herbs',
      'Toss with dressing and feta cheese',
      'Add olives and season with salt and pepper',
      'Chill for at least 30 minutes before serving'
    ],
    prepTime: 25,
    cookTime: 15,
    servings: 6,
    difficulty: Difficulty.EASY,
    categories: ['Vegetarian', 'Healthy', 'Quick & Easy'],
    ingredients: [
      { name: 'Tomatoes', quantity: '3', unit: 'medium' },
      { name: 'Onion', quantity: '1', unit: 'small' },
      { name: 'Lemon', quantity: '2', unit: 'large' },
      { name: 'Olive Oil', quantity: '1/4', unit: 'cup' },
    ]
  }
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create or update users
  console.log('Creating users...');
  const createdUsers: any[] = [];
  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: userData,
      create: userData,
    });
    createdUsers.push(user);
  }

  // Create or update categories
  console.log('Creating categories...');
  const createdCategories: any[] = [];
  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryData.name },
      update: categoryData,
      create: categoryData,
    });
    createdCategories.push(category);
  }

  // Create or update ingredients
  console.log('Creating ingredients...');
  const createdIngredients: any[] = [];
  for (const ingredientData of ingredients) {
    const ingredient = await prisma.ingredient.upsert({
      where: { name: ingredientData.name },
      update: ingredientData,
      create: ingredientData,
    });
    createdIngredients.push(ingredient);
  }

  // Create recipes with relationships
  console.log('Creating recipes...');
  for (let i = 0; i < recipes.length; i++) {
    const recipeData = recipes[i];
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    
    // Create recipe
    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        instructions: recipeData.instructions,
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        servings: recipeData.servings,
        difficulty: recipeData.difficulty,
        userId: randomUser.id,
      },
    });

    // Add categories
    for (const categoryName of recipeData.categories) {
      const category = createdCategories.find(c => c.name === categoryName);
      if (category) {
        await prisma.recipeCategory.create({
          data: {
            recipeId: recipe.id,
            categoryId: category.id,
          },
        });
      }
    }

    // Add ingredients
    for (const ingredientData of recipeData.ingredients) {
      const ingredient = createdIngredients.find(i => i.name === ingredientData.name);
      if (ingredient) {
        await prisma.recipeIngredient.create({
          data: {
            recipeId: recipe.id,
            ingredientId: ingredient.id,
            quantity: ingredientData.quantity,
            unit: ingredientData.unit,
          },
        });
      }
    }

    console.log(`✅ Created recipe: ${recipe.title}`);
  }

  console.log('🎉 Database seeding completed!');
  console.log(`Created ${createdUsers.length} users, ${createdCategories.length} categories, ${createdIngredients.length} ingredients, and ${recipes.length} recipes.`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });