import React from "react";

export default function Cards({ pokemon, onCardClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {pokemon.map((item) => (
        <div
          key={item.id}
          onClick={() => onCardClick(item)}
          className="group relative bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4 backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] flex flex-col items-center"
        >
          {/* Noyoblik (Rarity) belgisi */}
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {item.rarity || "Rare"}
          </span>

          {/* Pokemon rasmi (Turgan joyida sekin harakatlanib/tebrinib turadigan animatsiya: animate-pulse yoki animate-bounce) */}
          <div className="w-36 h-36 my-4 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-amber-500/5 rounded-full filter blur-lg group-hover:bg-amber-500/20 transition-all"></div>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] animate-bounce duration-1000 group-hover:scale-110 transition-transform"
              style={{ animationDuration: "3s" }}
              onError={(e) => {
                e.target.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
              }}
            />
          </div>

          {/* Ma'lumotlar */}
          <div className="text-center w-full mt-2">
            <span className="text-xs text-slate-400 font-mono">#{item.id}</span>
            <h3 className="text-lg font-bold text-white tracking-wide capitalize group-hover:text-amber-400 transition-colors">
              {item.name}
            </h3>
            
            <div className="mt-3 flex items-center justify-between w-full px-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400">Narxi:</span>
              <span className="text-emerald-400 font-bold font-mono text-base">
                ${item.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}