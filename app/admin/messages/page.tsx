import AdminHeader from "../_components/AdminHeader";
import { prisma } from "@/app/lib/prisma";
import MessagesList from "@/components/admin/MessagesList";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-neutral-50">
      <AdminHeader />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-neutral-900">
            Messages
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            {messages.length} message(s) ·{" "}
            {messages.filter((m) => m.status === "UNREAD").length} non lu(s)
          </p>
        </div>

        <MessagesList initialMessages={messages} />
      </div>
    </main>
  );
}