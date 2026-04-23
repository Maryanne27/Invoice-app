import emptyImage from "../assets/emptyicon.png";

function EmptyState() {
  return (
    <div
      className="
      flex flex-col items-center justify-center text-center mt-16 px-6
    "
    >
      <img
        src={emptyImage}
        alt="empty"
        className="w-40 md:w-56 mb-8 object-contain"
      />

      <h2 className="text-xl font-bold text-textPrimary dark:text-white mb-2">
        There is nothing here
      </h2>

      <p className="text-textSecondary text-sm max-w-xs">
        Create an invoice by clicking the
        <span className="font-semibold text-textPrimary dark:text-white">
          {" "}
          New{" "}
        </span>
        button and get started
      </p>
    </div>
  );
}

export default EmptyState;
