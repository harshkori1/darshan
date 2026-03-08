import React from 'react';
import { Clock } from 'lucide-react';

const SlotCard = ({ slot, selected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(slot)}
      className={`p-4 rounded-lg border-2 transition-all ${
        selected?.id === slot.id
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 hover:border-orange-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <Clock size={20} className={selected?.id === slot.id ? 'text-orange-600' : 'text-gray-600'} />
        <div className="text-left">
          <p className="font-semibold text-gray-800">{slot.time}</p>
          <p className="text-sm text-gray-600">{slot.available} slots available</p>
        </div>
      </div>
    </button>
  );
};

export default SlotCard;
                                                                  