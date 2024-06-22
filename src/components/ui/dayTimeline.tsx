import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as Tooltip from '@radix-ui/react-tooltip';
import { DayCard, updateDayCard, deleteDayCard, reorderDayCards, addDayCard } from '@/redux/dayTimelineSlice';
import Modal from '@/components/Modal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const DayTimeline: React.FC = () => {
  const dispatch = useDispatch();
  const dayCards = useSelector((state: RootState) => state.dayTimeline.dayCards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState<DayCard | null>(null);

  const handleCardClick = (id: number) => {
    setCurrentCard(dayCards.find(card => card.id === id) || null);
    setIsModalOpen(true);
  };

  const handleEditClick = (day: DayCard) => {
    setCurrentCard(day);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveDetails = (details: string) => {
    if (currentCard) {
      const updatedDay = { ...currentCard, details };
      dispatch(updateDayCard(updatedDay));
      setIsModalOpen(false);
    }
  };

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentCard) {
      dispatch(deleteDayCard(currentCard.id));
      setIsModalOpen(false);
      setIsConfirmationModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleAddNewDay = () => {
    // Generate a new unique ID for the new day
    const newDay: DayCard = {
      id: dayCards.length ? dayCards[dayCards.length - 1].id + 1 : 1,
      title: `Day ${dayCards.length + 1}`,
      details: `Details for Day ${dayCards.length + 1}`,
    };
    dispatch(addDayCard(newDay));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(dayCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderDayCards(items));
  };

  return (
    <div className="day-timeline space-y-4 p-4">
      <Button onClick={handleAddNewDay} className="mb-4">
        Add Day
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {dayCards.map((day: DayCard, index: number) => (
                <Draggable key={day.id} draggableId={String(day.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                      <Card onClick={() => handleCardClick(day.id)}>
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold">{day.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                          <span className="text-gray-700">{day.details}</span>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <Button
                                variant="secondary"
                                className="ml-4"
                                onClick={(e) => { e.stopPropagation(); handleEditClick(day); }}
                              >
                                Edit
                              </Button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content className="bg-black text-white p-2 rounded shadow-lg">
                                Edit details
                                <Tooltip.Arrow className="fill-black" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {currentCard && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveDetails}
          onDelete={handleDeleteClick}
          currentDetails={currentCard.details}
        />
      )}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this card?"
      />
    </div>
  );
};

export default DayTimeline;
