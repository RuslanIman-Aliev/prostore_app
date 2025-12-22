import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// 1. Настраиваем WebSocket (Это обязательно для Neon Serverless!)
neonConfig.webSocketConstructor = ws;

// 2. Ваша строка подключения
// Я оставил её здесь, чтобы исключить проблему с нечитаемым .env
const connectionString = process.env.DATABASE_URL;

// 3. НОВЫЙ ПОДХОД (как на скриншоте)
// Мы больше не создаем "new Pool()". Мы передаем настройки сразу в адаптер.
const adapter = new PrismaNeon({
  connectionString: connectionString
});

// 4. Паттерн Singleton для Next.js (чтобы не плодить соединения)
const globalForPrisma = global as unknown as { prisma: any };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // Теперь адаптер совместим без "as any"
    log: ['error'],
  }).$extends({
    result: {
      product: {
        price: {
          compute(product) {
            return product.price.toString();
          },
        },
        rating: {
          compute(product) {
            return product.rating.toString();
          },
        },
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;