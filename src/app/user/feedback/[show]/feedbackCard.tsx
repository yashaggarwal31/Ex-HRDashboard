import { formatDateString } from "@/lib/FormatDateString";
// import { url_mark_feedback_viewed } from "@/app/lib/apiEndPoints";

function FeedbackCard({ feedback }) {
  const { id, title, description, createdby, createdat, viewed, isanon } =
    feedback;
  return (
    <div className="mb-4 w-4/6 rounded-md bg-white p-4 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-m rounded-lg bg-slate-200 px-2 py-1 text-black shadow-md">
          {!isanon ? createdby : "Anonymous"}
        </p>
      </div>
      <p className="mb-2 text-base">{description}</p>
      <div className="flex flex-row items-center justify-between">
        <p className="text-sm text-gray-500">{formatDateString(createdat)}</p>
        {(!viewed && (
          <p className="rounded-3xl bg-rose-500 px-2 py-1 text-white">
            Not Viewed
          </p>
        )) || (
          <p className="rounded-3xl bg-green-500 px-2 py-1 text-white">
            Viewed
          </p>
        )}
      </div>
    </div>
  );
}

export default FeedbackCard;
