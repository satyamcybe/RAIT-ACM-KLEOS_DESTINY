// ===========================================
// PRANAM - Home Page (redirects to onboarding or dashboard)
// ===========================================

import { redirect } from "next/navigation";

export default function HomePage() {
  // TODO: Check auth status and redirect accordingly
  // If authenticated + profile complete -> /dashboard
  // If authenticated + profile incomplete -> /onboarding
  // If not authenticated -> /sign-in

  redirect("/onboarding");
}
