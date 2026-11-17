import React, { useState } from "react";
import Cards from "./Cards";

export default function App() {
  // Boshlang'ich 10 ta Pokemon kartalari
  const [pokemonList, setPokemonList] = useState([
    { id: 1, name: "Pikachu", price: 150, rarity: "Legendary", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" },
    { id: 2, name: "Charizard", price: 450, rarity: "Epic", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" },
    { id: 3, name: "Bulbasaur", price: 90, rarity: "Common", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
    { id: 4, name: "Squirtle", price: 100, rarity: "Common", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" },
    { id: 5, name: "Jigglypuff", price: 120, rarity: "Rare", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png" },
    { id: 6, name: "Gengar", price: 300, rarity: "Epic", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png" },
    { id: 7, name: "Snorlax", price: 250, rarity: "Rare", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png" },
    { id: 8, name: "Mewtwo", price: 600, rarity: "Legendary", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" },
    { id: 9, name: "Eevee", price: 180, rarity: "Rare", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png" },
    { id: 10, name: "Lucario", price: 350, rarity: "Epic", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png" },
  ]);

  // Modal oynalar uchun holatlar (State)
  const [selectedCard, setSelectedCard] = useState(null); // Ustiga bosilgandagi oyna
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // + tugmasini bosgandagi forma

  // Yangi forma ma'lumotlari
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newRarity, setNewRarity] = useState("Rare");

  // Yangi pokemon qo'shish funksiyasi
  const handleAddPokemon = (e) => {
    e.preventDefault();
    if (!newName || !newPrice || !newImage) return;

    const newPokemon = {
      id: pokemonList.length + 1,
      name: newName,
      price: Number(newPrice),
      image: newImage,
      rarity: newRarity,
    };

    setPokemonList([newPokemon, ...pokemonList]);
    setNewName("");
    setNewPrice("");
    setNewImage("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-6 md:p-10">
      {/* Sarlavha va + Tugmasi */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Pokémon Cards Market
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Noyob pokemon kartalarini ko'ring va o'zingiznikini qo'shing
          </p>
        </div>

        {/* Tepada turgan + Tugmasi */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="text-xl font-black">+</span> Yangi Karta Qo'shish
        </button>
      </header>

      {/* Kartalar paneli */}
      <main className="max-w-7xl mx-auto">
        <Cards pokemon={pokemonList} onCardClick={(item) => setSelectedCard(item)} />
      </main>

      {/* --- KARTA USTIGA BOSILGANDAGI MODAL (To'liq ma'lumot va narx) --- */}
      {selectedCard && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-center">
              <span className="text-xs font-mono text-amber-400 px-3 py-1 bg-amber-500/10 rounded-full mb-2">
                {selectedCard.rarity}
              </span>
              <div className="w-48 h-48 my-4 flex items-center justify-center">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                  className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] animate-pulse"
                />
              </div>
              <h2 className="text-2xl font-black capitalize text-white mb-1">
                {selectedCard.name}
              </h2>
              <p className="text-slate-400 text-sm mb-4">
                Pokémon ID: #{selectedCard.id}
              </p>

              <div className="w-full bg-slate-950/60 rounded-xl p-4 mb-6 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Karta Narxi:</span>
                <span className="text-2xl font-mono font-bold text-emerald-400">
                  ${selectedCard.price}
                </span>
              </div>

              <button
                onClick={() => alert(`Siz ${selectedCard.name} kartasini sotib oldingiz!`)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Sotib Olish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- + TUGMASINI BOSGANDA OCHILADIGAN QO'SHISH FORMASI --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-amber-400 flex items-center gap-2">
              <span>+</span> Yangi Pokemon Qo'shish
            </h2>

            <form onSubmit={handleAddPokemon} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Pokemon Nomi</label>
                <input
                  type="text"
                  placeholder="Masalan: Raichu"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Narxi ($)</label>
                <input
                  type="number"
                  placeholder="Masalan: 200"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Rasm URL manzili (Link)</label>
                <input
                  type="url"
                  placeholder="https://... rasm havolasi"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Noyobligi (Rarity)</label>
                <select
                  value={newRarity}
                  onChange={(e) => setNewRarity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Common">Common</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                Qo'shish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}