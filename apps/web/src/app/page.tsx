import { IUser, sayHello } from '@repo/shared';

export default function Home() {
  const user: IUser = {
    id: 1,
    name: 'NextJS User',
    email: 'user@example.com',
    role: 'USER'
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Monorepo Demo</h1>
        <div className="p-6 border rounded-lg bg-white/5">
          <h2 className="text-2xl mb-4">Shared Code Test:</h2>
          <p className="text-lg text-green-400 font-mono">{sayHello('Next.js Client')}</p>
          <div className="mt-4 p-4 bg-black/20 rounded">
            <p className="text-sm text-gray-400">User Object from Shared Interface:</p>
            <pre className="text-xs mt-2">{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}
