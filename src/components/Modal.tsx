import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (details: string) => void;
  onDelete: () => void; // Add onDelete prop
  currentDetails: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, onDelete, currentDetails }) => {
  const [details, setDetails] = React.useState(currentDetails);

  React.useEffect(() => {
    setDetails(currentDetails);
  }, [currentDetails]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => onSave(details)}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onDelete} // Handle delete action
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
