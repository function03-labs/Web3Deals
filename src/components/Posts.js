import React from 'react';

const Post = ({ post }) => {
  const { logo_img_src, fundraising_name, funds_info, projects_info, website_links } = post;

  return (
    <div className="rounded border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className='flex gap-3 items-center mb-2'>
          <img src={logo_img_src} alt={fundraising_name} className="w-9 h-9 rounded-full" />
          <h2 className="text-lg font-semibold leading-none tracking-tight">{fundraising_name}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{funds_info}</p>
      </div>
    </div>
  );
};

export default Post;
