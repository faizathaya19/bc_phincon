import { CourseTryoutSectionModel } from '../../types/review'

interface Props {
  item: CourseTryoutSectionModel
  onClick: () => void
}

const ItemCard = ({ item, onClick }: Props) => (
  <div
    className="bg-white p-4 border rounded-md shadow-md cursor-pointer hover:shadow-lg transition duration-200"
    onClick={onClick}
  >
    <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
    <p className="text-xs text-gray-500 mt-2">Kode: {item.code}</p>
  </div>
)

export default ItemCard
