import React from 'react'
import Button from './Button'

export default function Modal({isOpen, onClose, onConfirm}) {
    if (!isOpen) return null;
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center  backdrop-blur-sm bg-gray-500/50 '>
<div className='bg-gray-100 rounded-lg shadow-lg p-6 w-96'>
     <p className="mb-6 text-gray-800">Are you sure you want to clear the whole shopping cart?</p>
<div className='flex flex-row gap-5'>
    <Button  onClick={onClose} btnTask="Cancel"/>
    <Button className="bg-rose-100 text-rose-600 hover:bg-rose-300 hover:text-rose-700 "  onClick={() => {
              onConfirm();
              onClose();
            }} btnTask="Yes,Clear"/>
</div>
</div>
    </div>
  )
}
