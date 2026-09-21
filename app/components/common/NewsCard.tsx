type NewsCardProps = {
  category: string;
  date: string;
  title: string;
  href?: string;
};

export default function NewsCard({
  category,
  date,
  title,
  href = "#",
}: NewsCardProps) {
  return (
    <article className="w-full max-w-[322px] rounded-[14px] border border-[#344056] bg-[#242E41] px-7 py-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-inter text-[10px] font-medium uppercase tracking-[0.24em] text-[#B89A67]">
          {category}
        </span>

        <span className="font-inter text-[10px] tracking-[0.18em] text-[#7F899A]">
          {date}
        </span>
      </div>

      <h3 className="font-cormorant text-[21px] leading-[1.2] text-[#F2F0EA]">
        {title}
      </h3>

      <a
        href={href}
        className="mt-4 inline-block font-inter text-[12px] text-[#B89A67] transition-opacity hover:opacity-70"
      >
        Read more →
      </a>
    </article>
  );
}