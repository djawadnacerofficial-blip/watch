import PillBadge from "./pillBadge"



const img = "https://res.cloudinary.com/uzu6pbxu/image/upload/v1785280719/lrkmzskji9w5ybvgdfoc.webp"
const username = "immo.n.101"
const timestamp = "2026-08-03"
const tags = ["history","action","drama"]

export default function Post() {
    return(
        <section className="post">
            <div className="poster">
                <img className="post-img" src={img} alt="post profile img" />
                <div className="poster-data">
                    <span className="post-username">{username}</span>
                    <p className="created-at">{timestamp}</p>
                </div>
                <div className="post-tags">
                    {tags?.map(tag => <PillBadge txt={tag} />)}
                </div>
            </div>
            <div className="post-txt">movies fan gdfsgds sdggdsg gd sdg sd fdsgf  fgdghfgjjf jhgj f ggdsg gd sdg sd fdsgf  fgdghfgjjf jhgj f ggdsg gd sdg sd fdsgf  fgdghfgjjf jhgj f ggdsg gd sdg sd fdsgf  fgdghfgjjf jhgj f ggdsg gd sdg sd fdsgf  fgdghfgjjf jhgj f ggdsg gd sdg sd fdsgf  fgdghfgjjf jhgj f ggdsg gd sdg sd fdsgf  fgdghfgjjf jhgj f ggdsg gd sdg sd fdsgf  fgdghfgjjf jhgj f ggdsg gd sdg sd fdsgf  fgdghfgjjf jhgj fghj</div>
        </section>
    )
}