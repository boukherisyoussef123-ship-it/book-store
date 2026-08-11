export default function NewBookPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Add New Book
      </h1>

      <form className="space-y-6">

        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Book title"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Author
          </label>

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Author"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            className="w-full border rounded-lg p-3 h-40"
          />
        </div>

        <button
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Save Book
        </button>

      </form>
    </div>
  );
}