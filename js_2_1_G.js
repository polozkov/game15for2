G = {
  //x-coord 012, y-coord 012
  f_el: function(nx_012, ny_012) {
    return document.getElementById("id_x" + nx_012 + "y" + ny_012);
  },

  EL: {},

  arr_links: ['url(jpgO.jpg)','url(jpgFREE.jpg)','url(jpgX.jpg)'],
  
  arr_texts: ["a3", "b3", "c3", "a2", "b2", "c2", "a1", "b1", "c1"],

  moves_played: [],
  f_posit: function () {return AI.f_arr_moves_to_position(G.moves_played); }
};

G.EL = {
  arr_el: [G.f_el(0,0), G.f_el(1,0), G.f_el(2,0), G.f_el(0,1), G.f_el(1,1), G.f_el(2,1), G.f_el(0,2), G.f_el(1,2), G.f_el(2,2)],
  play_copm: document.getElementById("id_play_comp"),
  play_back: document.getElementById("id_play_back"),
  play_new_game: document.getElementById("id_play_new_game"),
  flag_self: document.getElementById("id_flag_self"),
  flag_show_hints: document.getElementById("id_flag_show_hints"),
  
  f_draw_el: function (nx_012, ny_012, value_minus_one_plus_one) {
    G.EL.arr_el[nx_012 + ny_012 * 3].style.backgroundImage = G.arr_links[value_minus_one_plus_one + 1];
    G.EL.arr_el[nx_012 + ny_012 * 3].style.backgroundSize = "cover";
  },

  f_write_text_on_cells_final: function (arr_texts) {
    for (var i = 0; i < 9; i+=1)
      G.EL.arr_el[i].innerHTML = arr_texts[i];
  },

  f_write_text_on_cells: function (with_score = false, with_G_arr_texts = false, arr_texts = G.arr_texts) {
    var arr_9 = [];
    function f_score(i) {
      var my_move = G.f_posit().f_move_from_cell_or_null(i); 
      if (my_move === null) {return "";}
      return  "" + G.f_posit().f_move_do_copy(my_move).f_score_comment();
    }
    for (var i = 0; i < 9; i+=1)
      arr_9.push((with_G_arr_texts ? arr_texts[i].slice() + "=" : "") + (with_score ? f_score(i) : ""));
    //debugger
    G.EL.f_write_text_on_cells_final(arr_9);
  },

  f_draw_all: function (arr_08) {
    for (var iy = 0; iy <= 2; iy+=1) 
    for (var ix = 0; ix <= 2; ix+=1)
    G.EL.f_draw_el(ix, iy, arr_08[ix + iy * 3]);
    G.EL.f_write_text_on_cells(G.EL.flag_show_hints.checked, false);
  }
};