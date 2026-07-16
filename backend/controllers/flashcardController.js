import Flashcard from '../models/Flashcard.js';

//@desc Get all flashcards for a document
//@route GET /api/flashcards/:documentid
//@access Private
export const getFlashcards = async (req, res, next) => {
    try {
        const flashcards = await Flashcard.find({
            documentId: req.params.documentId,
            userId: req.user._id
        })
            .populate('documentId', 'title fileName')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: flashcards,
            count: flashcards.length
        });
    } catch (error) {
        next(error);
    }
};


//@desc Get all flashcard sets for a user
//@route GET /api/flashcards
//@access Private
export const getAllFlashcardSets = async (req, res, next) => {
    try {
        const flashcardSets = await Flashcard.find({ userId: req.user._id })
            .populate('documentId', 'title')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: flashcardSets,
            count: flashcardSets.length
        });

    } catch (error) {
        next(error);
    }
};

//@desc Mark a flashcard as reviewed
//@route POST /api/flashcards/:cardId/review
//@access Private
export const reviewFlashcard = async (req, res, next) => {
    try {
        const flashcardSet = await Flashcard.findOne({
            'cards._id': req.params.cardId,
            userId: req.user._id
        });
        if (!flashcardSet) {
            return res.status(404).json({
                success: false,
                error: "Flashcard set or card not found",
                statusCode: 404
            });
        }

        const cardIndex = flashcardSet.cards.findIndex(card => card._id.toString() === req.params.cardId);

        if (cardIndex === -1) {
            return res.status(404).json({
                success: false,
                error: "Card not found in set",
                statusCode: 404
            });
        }

        //Update review info

        flashcardSet.cards[cardIndex].lastReviewed = new Date();
        flashcardSet.cards[cardIndex].reviewCount += 1;

        await flashcardSet.save();
        res.status(200).json({
            success: true,
            data: flashcardSet,
            message: "Flashcard reviewed successfully"
        });

    } catch (error) {
        next(error);
    }
};

//@desc Toggle star/favorite on flashcard
//@route PUT /api/flashcards/:cardId/star
//@access Private
export const toggleStarFlashcard = async (req, res, next) => {
    try {



        const flashcardSet = await Flashcard.findOne({
            'cards._id': req.params.cardId,
            userId: req.user._id
        });


        if (!flashcardSet) {
            return res.status(404).json({
                success: false,
                error: "Flashcard set or card not found",
                statusCode: 404
            });
        }

        const cardIndex = flashcardSet.cards.findIndex(card => card._id.toString() === req.params.cardId);

        if (cardIndex === -1) {
            return res.status(404).json({
                success: false,
                error: "Card not found in set",
                statusCode: 404
            });
        }

        //toggle start
        flashcardSet.cards[cardIndex].isStarred = !flashcardSet.cards[cardIndex].isStarred;

        await flashcardSet.save();

        return res.status(200).json({
            success: true,
            data: flashcardSet,
            message: `Flashcard ${flashcardSet.cards[cardIndex].isStarred ? 'starred' : 'unstarred'}`
        });

    } catch (error) {
        next(error);
    }
};

//@desc Delete a flashcard set
//@route DELETE /api/flashcards/:Id
//@access Private
export const deleteFlashcardSet = async (req, res, next) => {
    try {
        const flashcardSet = await Flashcard.findOne({
            _id: req.params.Id,
            userId: req.user._id
        });

        if (!flashcardSet) {
            return res.status(404).json({
                success: false,
                error: "Flashcard set not found",
                statusCode: 404
            });
        }

        await flashcardSet.deleteOne();

        res.status(200).json({
            success: true,
            message: "Flashcard set deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};