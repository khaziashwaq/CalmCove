interface ArticleCardProps {
  title: string;
  description: string;
  link: string;
}

export default function ArticleCard({
  title,
  description,
  link,
}: ArticleCardProps) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6 text-lg leading-relaxed min-h-[120px]">
        {description}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Read More
      </a>
    </div>
  );
}
