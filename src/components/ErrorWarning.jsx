function ErrorWarning({ title, content }) {
  return (
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <p class="font-bold">{title}</p>
      <p class="block sm:inline">{content}</p>
    </div>
  );
}

export default ErrorWarning;
