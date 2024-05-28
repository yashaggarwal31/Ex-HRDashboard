import { MarkViewed } from "@/lib/feedbacks";

export async function markReadFn(id: number) {
  try {
    console.log("number", id);
    const res = await MarkViewed(id);
    console.log(res);
  } catch (error) {}
}
