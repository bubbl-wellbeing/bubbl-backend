const Journal = require("../models/journalModel");

// Get list of all journal
const getList = async (req, res, next) => {
  try {
    // const list = await Journal.find();
    const list = await Journal.find({ username: req.params.username });
    return res.status(200).json({
      message: "Successful",
      data: list,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
};

// Get one journal from the list
const getOne = async (req, res, next) => {
  try {
    const list = await Journal.findById(req.params.id);
    console.log(req.params.id);
    if (!list) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    return res.status(200).json({
      message: "Successful",
      data: list,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
};

// Create new journal
const addList = async (req, res, next) => {
  try {
    const list = await new Journal({
      username: req.body.username,
      JournalText: req.body.JournalText,
      Mood: req.body.Mood,
    });
    const saveList = await list.save();
    return res.status(201).json({
      message: "Successful",
      data: saveList,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
};

// Edit journal
const updateList = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const newList = await Journal.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Successful",
      data: newList,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
};

// Delete journal
const deleteList = async (req, res, next) => {
  try {
    const List = await Journal.findById(req.body._id);
    if (!List) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    await List.remove();
    return res.status(200).json({
      message: "Successful",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
    });
  }
};

module.exports = { getList, getOne, addList, updateList, deleteList };
