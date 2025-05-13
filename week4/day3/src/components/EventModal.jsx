import React from "react";
import useStore from "../store/useStore";

export default function EventModal() {
  const {
    closeModal,
    addEvent,
    formData,
    updateData,
    step,
    setStep,
    resetForm,
    setValidationErrors,
    validationErrors,
  } = useStore();

  const handleNext = () => {
    const errors = {};
    if (step === 1 && !formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (step === 2 && !formData.date) {
      errors.date = "Date is required";
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = new Date(`${formData.date}T${formData.startTime}`);
    const end = new Date(`${formData.date}T${formData.endTime}`);
    if (end <= start) {
      alert("End time must be after start time.");
      return;
    }

    addEvent({
      title: formData.title,
      start: start.toISOString(),
      end: end.toISOString(),
    });

    resetForm();
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
      >
        <h3 className="text-lg font-semibold mb-4">
          {step === 3 ? "Confirm Event" : "Add Event"}
        </h3>

        {step === 1 && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => updateData({ title: e.target.value })}
              className="w-full p-2 border rounded"
            />
            {validationErrors.title && (
              <p className="text-red-500 text-sm">{validationErrors.title}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <>
            <div className="mb-3">
              <label className="block text-sm mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateData({ date: e.target.value })}
                className="w-full p-2 border rounded"
              />
              {validationErrors.date && (
                <p className="text-red-500 text-sm">{validationErrors.date}</p>
              )}
            </div>
            <div className="flex gap-4 mb-3">
              <div className="flex-1">
                <label className="block text-sm mb-1">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateData({ startTime: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateData({ endTime: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="mb-4 text-sm space-y-2">
            <p><strong>Title:</strong> {formData.title}</p>
            <p><strong>Date:</strong> {formData.date}</p>
            <p>
              <strong>Time:</strong> {formData.startTime} to {formData.endTime}
            </p>
          </div>
        )}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
