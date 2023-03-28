import IArticle from "@/assets/state/articles/article";
import useSSGSafe from "@/hooks/useSSGSafe";

export type IArticleBrief = {
  date: string;
  readtime: number;
} & Omit<IArticle, "content" | "updated" | "created">;

export interface ArticleBriefProps extends IArticleBrief {

}

const readtimeFormatter = Intl.NumberFormat(undefined, {
  style: "unit",
  unit: "minute"
});

const ArticleBrief = ({ title, thumbnail, thumbnailAlt, readtime, teaser, author, date }: ArticleBriefProps) => {
  const safeToRender = useSSGSafe();

  return (
    <div>
      <img
        src={thumbnail.src}
        width={thumbnail.width}
        height={thumbnail.height}
        className="aspect-[16/7] object-contain"
        alt={thumbnailAlt}
      />
      <div className="text-lg font-bold">{title}</div>
      <div>{teaser}</div>
      <div>{author.name}</div>
      {safeToRender && readtimeFormatter.format(readtime)}
      {safeToRender && <div>{(new Date(date)).toLocaleDateString()}</div>}
    </div>
  );
};

export default ArticleBrief;