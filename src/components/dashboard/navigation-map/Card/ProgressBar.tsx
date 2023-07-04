interface ProgressBarProps {
  amountTask: number
  completedTask: number
}

export default function ProgressBar({
  amountTask = 0,
  completedTask = 0,
}: ProgressBarProps) {
  const circumferenceSize = 377
  const percentOfCircumference = amountTask > 0 ? completedTask / amountTask : 0
  const completedSize = Math.abs(
    Math.round(percentOfCircumference * circumferenceSize) - circumferenceSize,
  )

  return (
    <svg
      className="absolute top-0 left-0 -scale-y-100"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="9rem"
      height="9rem"
    >
      <defs>
        <linearGradient id="GradientColor">
          <stop offset="0%" stopColor="#65BAFA" />
          <stop offset="100%" stopColor="#9D37F2" />
        </linearGradient>
      </defs>

      <circle
        className="fill-none stroke-slate-100 [stroke-width:8px] [stroke-dasharray:472] "
        cx="50%"
        cy="50%"
        r="60"
      />
      <circle
        className="fill-none stroke-[url(#GradientColor)] blur-sm [stroke-width:8px] group-hover:stroke-white"
        style={{
          strokeDasharray: circumferenceSize,
          strokeDashoffset: completedSize,
        }}
        cx="50%"
        cy="50%"
        r="60"
      />
      <circle
        className="fill-none stroke-[url(#GradientColor)] [stroke-width:8px] group-hover:stroke-white"
        style={{
          strokeDasharray: circumferenceSize,
          strokeDashoffset: completedSize,
        }}
        cx="50%"
        cy="50%"
        r="60"
      />
    </svg>
  )
}
