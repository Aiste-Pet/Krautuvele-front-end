import ShopCard from "../ShopCard/ShopCard";
import ProductCard from "../ProductCard/ProductCard";
import Slider from "../Slider/Slider";


export default async function ListFetcher({ api_url, type, slider }) {
    const data = await fetch(api_url)
    const LIST = await data.json()
    let element;
    if (type === undefined) {
        element = LIST.map((item) => <div key={item.id}><ProductCard key={item.id} item={item} /></div>)
    };
    if (type === "shop") {
        element = LIST.map((item) => <div key={item.id}><ShopCard key={item.id} item={item} /></div>)
    };
    if (slider==="true") {
    return (
        <div>
            <Slider element={element} />
        </div>
    )
} else {
    return (
        <div>
            {element}
        </div>
)}}