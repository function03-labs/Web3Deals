import Card from '@/components/Card';

const CardFeed = ({ data }) => {
  console.log(data)
  return (
<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 mx-12">
      {data.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          icon={card.icon}
          stat={card.stat}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default CardFeed;
