import { ReviewType } from '../../types/review'

interface Props {
  selected: string
  onSelect: (type: ReviewType) => void
}

const types: ReviewType[] = ['course', 'tryout-section', 'app']

const Tabs = ({ selected, onSelect }: Props) => (
  <div className="flex space-x-2 mb-4">
    {types.map((type) => (
      <button
        key={type}
        className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
          selected === type
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onSelect(type)}
      >
        {type.replace('-', ' ')}
      </button>
    ))}
  </div>
)

export default Tabs
