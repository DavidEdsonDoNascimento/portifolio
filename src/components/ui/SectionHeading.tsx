type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ id, eyebrow, title, description }: Props) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="text-primary mb-3 font-mono text-xs tracking-widest uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-muted mt-4 text-base leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
