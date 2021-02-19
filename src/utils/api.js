import { AsyncStorage } from "react-native";
import { getUniqueID } from "./helper";

const FLASHCARDS_STORAGE_KEY = "flashcards_storage_data";

/**
 * Simple Data to initial the project with
 */
function initialData() {
  return {
    "632mgp7hm68vzvg2amz1hq": {
      id: "632mgp7hm68vzvg2amz1hq",
      title: "JavaScript",
      questions: [
        {
          question: "What is JavaScript?",
          answer: "JavaScript is a programming language"
        },

      ]
    },
  };
}

/**
 * get all decks or set them with the initial data
 */
export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    if (results) {
      const data = JSON.parse(results);
      return data;
    } else {
      await AsyncStorage.setItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify(initialData())
      );
      return initialData();
    }
  } catch (error) {
    await AsyncStorage.setItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify(initialData())
    );
    return initialData();
  }
}

/*
  save a new deck with a unique UUID
 */
export async function saveDeckTitle(title) {
  const id = getUniqueID();
  const deck = {
    id: id,
    title: title,
    questions: []
  };

  await AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [id]: deck
    })
  );
  return deck;
}

export async function saveCardToDeck(deckId, card) {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    const deck = data[deckId];
    deck.questions = deck.questions.concat([card]);
    await AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [deckId]: deck
      })
    );
    return card;
  }
}

export async function removeDeck(deckId) {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    delete data[deckId];

    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  return {};
}
