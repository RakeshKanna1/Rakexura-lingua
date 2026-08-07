import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/alethia/index.html?v=" + Date.now());
}
