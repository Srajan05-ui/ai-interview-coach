type SkillBadgeProps = {
  skill: string;
};

export default function SkillBadge({
  skill,
}: SkillBadgeProps) {
  return (
    <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
      {skill}
    </span>
  );
}