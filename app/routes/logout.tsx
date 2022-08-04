import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";
import { sleep } from "~/utils";

export async function action({ request }: ActionArgs) {
  await sleep(1000);
  return logout(request);
}

export async function loader() {
  return redirect("/");
}
