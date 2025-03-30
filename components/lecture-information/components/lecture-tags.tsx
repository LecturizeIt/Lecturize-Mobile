import TagBadge from "@/components/tag-badge";
import { Tag } from "@/types/lecture";

const LectureTags = ({ tags }: { tags: { id?: number, name?: string }[] }) => {
  return (
    <>
      {tags ? (
        <>
          {tags.map(({ name, id }) => (
            <TagBadge key={id} name={name!} />
          ))}
        </>
      ) : null}
    </>
  )
}

export default LectureTags;
