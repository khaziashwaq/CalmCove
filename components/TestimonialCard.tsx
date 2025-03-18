interface TestimonialCardProps {
  heading: string;
  body: string;
}

const TestimonialCard = ({ heading, body }: TestimonialCardProps) => {
  return (
    <div className="h-[400px] w-[300px] bg-white rounded-lg shadow-lg p-6 flex flex-col">
      <div className="flex-none">
        <h2 className="text-xl font-bold mb-4 text-gray-900">{heading}</h2>
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-gray-600 line-clamp-6">{body}</p>
      </div>
      <div className="flex-none mt-4">
        <span className="text-blue-500 hover:text-blue-600">Read more →</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
