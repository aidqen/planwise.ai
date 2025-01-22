import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function GoalForm({ currentGoal, setCurrentGoal, currentImportance, setCurrentImportance, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col md:grid md:grid-cols-[1fr_100px] md:grid-rows-2 grid-rows-3 gap-3"
    >
      <Input
        type="text"
        value={currentGoal}
        onChange={e => setCurrentGoal(e.target.value)}
        placeholder="Enter your goal or task"
        className="col-span-2 row-start-1 w-full text-base rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />
      <div className="col-start-1 row-start-2 space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-white">
          Select Importance
        </label>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="low"
              name="priority"
              value="low"
              checked={currentImportance === "low"}
              onChange={(e) => setCurrentImportance(e.target.value)}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="low"
              className="ml-2 text-sm font-medium text-green-700 dark:text-green-400"
            >
              Low
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="medium"
              name="priority"
              value="medium"
              checked={currentImportance === "medium"}
              onChange={(e) => setCurrentImportance(e.target.value)}
              className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="medium"
              className="ml-2 text-sm font-medium text-yellow-700 dark:text-yellow-400"
            >
              Medium
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="high"
              name="priority"
              value="high"
              checked={currentImportance === "high"}
              onChange={(e) => setCurrentImportance(e.target.value)}
              className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="high"
              className="ml-2 text-sm font-medium text-red-700 dark:text-red-400"
            >
              High
            </label>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        size="icon"
        className="flex md:col-start-2 col-span-2 md:row-start-2 row-start-3 justify-center items-center w-full md:h-full text-white bg-blue-600 rounded-lg shadow-md transition-all hover:bg-blue-700 hover:shadow-lg dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        Submit Goal
      </Button>
    </form>
  );
}
