import basil from "../icons/basil.json";

export default function BasilIcon({ name, size = 18, className }) {
  const icon = basil.icons[name];
  if (!icon) return null;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${basil.width} ${basil.height}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
