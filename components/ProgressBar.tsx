type ProgressBarProps = {
  label: string;
  value: number;
};

export default function ProgressBar({
  label,
  value,
}: ProgressBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="h-2 bg-gray-700 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}