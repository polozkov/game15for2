G.f_play_new_game = function() {
  G.moves_played = [];
  G.EL.f_draw_all(G.f_posit().posit);
  console.log("Start_New_Game");
}

G.f_play_copm = function() {
  if (G.f_posit().f_is_game_over()) {return;}
  var new_best_move = G.f_posit().f_best_move();
  G.moves_played.push(new_best_move);
  G.EL.f_draw_all(G.f_posit().posit);
  //G.f_posit().f_console("COMP_PLAY");
};

G.f_play_back = function() {
  console.log("POP");
  if (G.moves_played.length === 0) return;
  G.moves_played.pop();
  G.EL.f_draw_all(G.f_posit().posit);

};

G.f_play_cell = function(n_cell) {
  var my_move = G.f_posit().f_move_from_cell_or_null(n_cell);
  if (my_move === null) {return;}

  G.moves_played.push(my_move);
  G.EL.f_draw_all(G.f_posit().posit);
  //G.f_posit().f_console("PLAYER_PLAY");

  if (G.EL.flag_self.checked) {return;}
  G.f_play_copm();
};



(function f_set_events() {
  function f_cet_cell(i) {
    function f() {G.f_play_cell(i);}
    G.EL.arr_el[i].onclick = f;
  }

  for (var i = 0; i <= 8; i+= 1)
    f_cet_cell(i);

  G.EL.f_draw_all(G.f_posit().posit);

  G.EL.play_copm.onclick = G.f_play_copm;
  G.EL.play_new_game.onclick = G.f_play_new_game;
  G.EL.play_back.onclick = G.f_play_back;

  G.EL.flag_show_hints.onchange = G.EL.f_draw_all;
}());