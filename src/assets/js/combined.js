(function (a) {
  a.fn.extend({
    easyResponsiveTabs: function (k) {
      var c = {
        type: "default",
        width: "auto",
        fit: true,
        closed: false,
        tabidentify: "",
        activetab_bg: "white",
        inactive_bg: "#F5F5F5",
        active_border_color: "#c1c1c1",
        active_content_border_color: "#c1c1c1",
        activate: function () {}
      };
      var k = a.extend(c, k);
      var b = k,
        g = b.type,
        j = b.fit,
        i = b.width,
        e = "vertical",
        f = "accordion";
      var d = window.location.hash;
      var h = !!(window.history && history.replaceState);
      a(this).bind("tabactivate", function (l, m) {
        if (typeof k.activate === "function") {
          k.activate.call(m, l)
        }
      });
      this.each(function () {
        var p = a(this);
        var t = p.find("ul.resp-tabs-list." + k.tabidentify);
        var s = p.attr("id");
        p.find("ul.resp-tabs-list." + k.tabidentify + " li").addClass("resp-tab-item").addClass(k.tabidentify);
        p.css({
          display: "block",
          width: i
        });
        if (k.type == "vertical") {
          t.css("margin-top", "0px")
        }
        p.find(".resp-tabs-container." + k.tabidentify).css("border-color", k.active_content_border_color);
        p.find(".resp-tabs-container." + k.tabidentify + " > div").addClass("resp-tab-content").addClass(k.tabidentify);
        r();

        function r() {
          if (g == e) {
            p.addClass("resp-vtabs").addClass(k.tabidentify)
          }
          if (j == true) {
            p.css({
              width: "100%",
              margin: "0px"
            })
          }
          if (g == f) {
            p.addClass("resp-easy-accordion").addClass(k.tabidentify);
            p.find(".resp-tabs-list").css("display", "none")
          }
        }
        var m;
        p.find(".resp-tab-content." + k.tabidentify).before("<h2 class='resp-accordion " + k.tabidentify + "' role='tab'><span class='resp-arrow'></span></h2>");
        p.find(".resp-tab-content." + k.tabidentify).prev("h2").css({
          "background-color": k.inactive_bg,
          "border-color": k.active_border_color
        });
        var l = 0;
        p.find(".resp-accordion").each(function () {
          m = a(this);
          var w = p.find(".resp-tab-item:eq(" + l + ")");
          var v = p.find(".resp-accordion:eq(" + l + ")");
          v.append(w.html());
          v.data(w.data());
          m.attr("aria-controls", k.tabidentify + "_tab_item-" + (l));
          l++
        });
        var q = 0,
          u;
        p.find(".resp-tab-item").each(function () {
          $tabItem = a(this);
          $tabItem.attr("aria-controls", k.tabidentify + "_tab_item-" + (q));
          $tabItem.attr("role", "tab");
          $tabItem.css({
            "background-color": k.inactive_bg,
            "border-color": "none"
          });
          var v = 0;
          p.find(".resp-tab-content." + k.tabidentify).each(function () {
            u = a(this);
            u.attr("aria-labelledby", k.tabidentify + "_tab_item-" + (v)).css({
              "border-color": k.active_border_color
            });
            v++
          });
          q++
        });
        var n = 0;
        if (d != "") {
          var o = d.match(new RegExp(s + "([0-9]+)"));
          if (o !== null && o.length === 2) {
            n = parseInt(o[1], 10) - 1;
            if (n > q) {
              n = 0
            }
          }
        }
        a(p.find(".resp-tab-item." + k.tabidentify)[n]).addClass("resp-tab-active").css({
          "background-color": k.activetab_bg,
          "border-color": k.active_border_color
        });
        if (k.closed !== true && !(k.closed === "accordion" && !t.is(":visible")) && !(k.closed === "tabs" && t.is(":visible"))) {
          a(p.find(".resp-accordion." + k.tabidentify)[n]).addClass("resp-tab-active").css({
            "background-color": k.activetab_bg + " !important",
            "border-color": k.active_border_color,
            background: "none"
          });
          a(p.find(".resp-tab-content." + k.tabidentify)[n]).addClass("resp-tab-content-active").addClass(k.tabidentify).attr("style", "display:block")
        } else {}
        p.find("[role=tab]").each(function () {
          var v = a(this);
          v.click(function () {
            var B = a(this);
            var w = B.attr("aria-controls");
            if (B.hasClass("resp-accordion") && B.hasClass("resp-tab-active")) {
              p.find(".resp-tab-content-active." + k.tabidentify).slideUp("", function () {
                a(this).addClass("resp-accordion-closed")
              });
              B.removeClass("resp-tab-active").css({
                "background-color": k.inactive_bg,
                "border-color": "none"
              });
              return false
            }
            if (!B.hasClass("resp-tab-active") && B.hasClass("resp-accordion")) {
              p.find(".resp-tab-active." + k.tabidentify).removeClass("resp-tab-active").css({
                "background-color": k.inactive_bg,
                "border-color": "none"
              });
              p.find(".resp-tab-content-active." + k.tabidentify).slideUp().removeClass("resp-tab-content-active resp-accordion-closed");
              p.find("[aria-controls=" + w + "]").addClass("resp-tab-active").css({
                "background-color": k.activetab_bg,
                "border-color": k.active_border_color
              });
              p.find(".resp-tab-content[aria-labelledby = " + w + "]." + k.tabidentify).slideDown().addClass("resp-tab-content-active")
            } else {
              p.find(".resp-tab-active." + k.tabidentify).removeClass("resp-tab-active").css({
                "background-color": k.inactive_bg,
                "border-color": "none"
              });
              p.find(".resp-tab-content-active." + k.tabidentify).removeAttr("style").removeClass("resp-tab-content-active").removeClass("resp-accordion-closed");
              p.find("[aria-controls=" + w + "]").addClass("resp-tab-active").css({
                "background-color": k.activetab_bg,
                "border-color": k.active_border_color
              });
              p.find(".resp-tab-content[aria-labelledby = " + w + "]." + k.tabidentify).addClass("resp-tab-content-active").attr("style", "display:block")
            }
            B.trigger("tabactivate", B);
            if (h) {
              var z = window.location.hash;
              var A = w.split("tab_item-");
              var y = s + (parseInt(A[1], 10) + 1).toString();
              if (z != "") {
                var x = new RegExp(s + "[0-9]+");
                if (z.match(x) != null) {
                  y = z.replace(x, y)
                } else {
                  y = z + "|" + y
                }
              } else {
                y = "#" + y
              }
              history.replaceState(null, null, y)
            }
          })
        });
        a(window).resize(function () {
          p.find(".resp-accordion-closed").removeAttr("style")
        })
      })
    }
  })
})(jQuery);
window.onkeydown = function (b) {
  if ($("#overlay-temp").css("display") !== "none") {
    var a = b.keyCode ? b.keyCode : b.which;
    return (a == 154)
  }
};
// $(".carousel").carousel({
//   interval: 8000
// });

function isUndefined(a) {
  return ((typeof a === "undefined") || (a == "undefined")) ? true : false
}
var replace = function (c, a, b) {
  return c.split(a).join(b).toLowerCase()
};
var hideAlert = function () {
  $("div.alert.alert-close").hide()
};
// $("body").scrollspy({
//   target: "#my-nav"
// });
$(document).ready(function () {
  $("#overlay-temp").fadeOut("slow");
  $("#body_logonflow_login #idfield").val("");
  $("#body_logonflow_login #passfield").val("");
  $(".for-for-loop div:first").addClass("in active");
  $(".pager-index").each(function (d) {
    $(this).addClass("li_" + (d + 1));
    $(this).find("a").text("" + (d + 1))
  });
  $(".li_1").addClass("active");
  $(".next-page").click(function () {
    $(".active").next("li").find("a").trigger("click")
  });
  $(".prev-page").click(function () {
    $(".active").prev("li").find("a").trigger("click")
  });
  $(".btn.success-light, .btn.success-dark, .btn.btn-sm, .btn.btn-xs, .load-preloader, #navbar li a, .startoverlay").click(function () {
    if ($(this).hasClass("no-overlay-please")) {} else {
      $("#overlay-temp").show();
      $("#overlay-temp-logo").show()
    }
  });
  $("#infopans .shadowbox").click(function () {
    if ($(this).hasClass("doNothinig")) {} else {
      $(this).find("a.success-light, input.clickme")[0].click()
    }
  });
  $("#optFourShow .panel, #optThreeShow .panel").click(function () {
    $(this).find("a.success-light, input.clickme")[0].click()
  });
  $("#apply-action, #apply-action-mobile").click(function () {
    $("#apply_now").click()
  });
  $(".help-error").click(function () {
    $(this).toggleClass("glyphicon-exclamation-sign glyphicon-remove")
  });
  var a = false;
  var c = false;
  // $(".popper").popover({
  //   html: true,
  //   placement: "bottom",
  //   container: ".om-popover-hold",
  //   title: function () {
  //     return $(this).data("title") + '<button type="button" class="close close-pop" data-dismiss="popover">x</button>'
  //   },
  //   content: function () {
  //     return $(this).parent().find(".popper-content").html()
  //   },
  //   trigger: "manual"
  // }).click(function (d) {
  //   $(this).popover("show");
  //   c = false;
  //   a = true;
  //   d.preventDefault()
  // });
  // $(document).click(function (d) {
  //   if (a & c) {
  //     $(".popper").popover("hide");
  //     a = c = false
  //   } else {
  //     c = true
  //   }
  // });
  doExpensesCalc = function () {
    var d = 0;
    var f = parseInt($("#totalBureau").text().replace(/[,]/g, ""));
    $("#expensescalc input.exp_calc").each(function () {
      d += parseFloat($(this).val().replace(/[,]/g, "") * 1)
    });
    var e = f + d;
    $("#totalBureau").text(f.toFixed(2));
    $(".totalAddedByYou").text(d.toFixed(2));
    $(".totalExpensesCalc").text(e.toFixed(2))
  };
  doExpensesCalc();
  $("#expensescalc input.exp_calc").keyup(function () {
    doExpensesCalc()
  });
  // $(function () {
  //   $('[data-toggle="tooltip"]').tooltip();
  //   $('[data-toggle="popover"]').popover()
  // });
  // initFormFields();
  // initInputTel();
  // loadDecimalFormat();
  // initAlertMessage();

  function b() {
    var d = navigator.cookieEnabled;
    if (d === false) {
      $("#collapseCookie").addClass("in")
    }
  }
  b();
  $(".containSitemap").prepend('<div class="livechatContainer"></div>');
  $(".livechatContainer").prepend($("#touchpoint-button"))
});
var initAlertMessage = function () {
  var b = $("div.alert.alert-close");
  var d = b.html();
  if (!isUndefined(d) && d.trim() != "") {
    b.show();
    setTimeout(hideAlert, 3000)
  }
  var c = $("div.alert.alert-show");
  var a = c.html();
  if (!isUndefined(a) && a.trim() != "") {
    c.show()
  }
};
var initFormFields = function () {
  $(".help-error").parents(".form-group, .input-group").addClass("has-error has-feedback");
  initInfields();
  checkCheckbox();
  checkSelectVal()
};
var checkSelectVal = function () {
  $("select").each(function () {
    var a = $(this).val();
    if (a === "") {
      $(this).addClass("no-selection")
    }
  });
  $("select").change(function () {
    var a = $(this);
    if (a.val() === "") {
      a.addClass("no-selection")
    } else {
      a.removeClass("no-selection")
    }
  })
};
var checkCheckbox = function () {
  $('input[type="checkbox"]').each(function () {
    var a = $(this);
    a.attr("checked", "checked");
    if (a.val() == 1 || a.val() === "true") {
      a.parents(".switch").find(".cb-enable").addClass("selected")
    }
    if (a.val() == 0 || a.val() === "false") {
      a.parents(".switch").find(".cb-disable").addClass("selected").parent().addClass("is-disabled");
      $(this).parent().parent().find(".warningValidation").removeClass("displaynone")
    } else {}
  });
  $(".cb-enable").click(function () {
    var a = $(this).parents(".switch");
    $(".cb-disable", a).removeClass("selected").parent().removeClass("is-disabled");
    $(this).addClass("selected");
    $(".checkbox-switch", a).prop("checked", true).val("1");
    $(this).parent().find(".warningValidation").addClass("displaynone");
    $(".checkbox-switch").trigger("change")
  });
  $(".cb-disable").click(function () {
    var a = $(this).parents(".switch");
    $(".cb-enable", a).removeClass("selected").parent().addClass("is-disabled");
    $(this).addClass("selected");
    $(".checkbox-switch", a).prop("checked", true).val("0");
    $(this).parent().find(".warningValidation").removeClass("displaynone");
    $(".checkbox-switch").trigger("change")
  })
};

function formatDecimal(e) {
  e += "";
  var a = e.split(".");
  var d = a[0];
  var b = a.length > 1 ? "." + a[1] : "";
  var c = /(\d+)(\d{3})/;
  while (c.test(d)) {
    d = d.replace(c, "$1,$2")
  }
  return d + b
}
var loadDecimalFormat = function () {
  $('input[type="tel"]').each(function () {
    var a = $(this);
    var b = a.attr("onkeyup");
    if (a.val() == 0) {
      a.val("")
    }
    if (typeof b != "undefined" && b.match("decimalFormat") != null) {
      a.val(formatDecimal(a.val()))
    }
  });
  $(".format-number").each(function () {
    var a = $(this);
    a.text(formatDecimal(a.text()));
    a.val(formatDecimal(a.val()))
  })
};

function initInputTel() {
  $('input[type="tel"]').keypress(function (b, a) {
    if (b.which == 0 || b.which == 8 || (b.ctrlKey && String.fromCharCode(b.which).match(/[a]/g))) {
      return true
    }
    if (String.fromCharCode(b.which).match(/[^0-9.]/g)) {
      return false
    }
  })
}

function ajaxComplete() {
  // $('[data-toggle="popover"]').popover({
  //   trigger: "click",
  //   html: true
  // });
  initFormFields();
  loadDecimalFormat();
  initInputTel();
  initAlertMessage()
}
$("input[type=submit], form:submit").on("click", function () {
  $(document).off("click")
});
var AjaxRequest = function () {
  var c;
  var b;
  var g;
  this.callback = {
    success: function (i) {
      c = i
    },
    complete: function (i) {
      b = i
    },
    error: function (i) {
      g = i
    }
  };
  var a = function (i, j) {
    this.name = i;
    this.value = j
  };
  var f = [];
  this.addParam = function (i, j) {
    f[f.length] = new a(i, j)
  };
  var e = function () {
    var i = "";
    if (f.length > 0) {
      i = "?";
      $.each(f, function (j, k) {
        i = i + k.name + "=" + k.value;
        if (f.length > j + 1) {
          i = i + "&"
        }
      })
    }
    return i
  };
  var h = function (k) {
    try {
      var i = JSON.parse(k);
      if (!isUndefined(i.redirect) && i.redirect) {
        window.location.assign(i.url);
        return true
      }
    } catch (j) {}
    return false
  };
  var d = function (k, i, j) {
    $.ajax({
      url: i,
      cache: false,
      timeout: 10000,
      method: k,
      data: j,
      dataType: "html",
      success: function (l) {
        if (h(l)) {
          return
        }
        if (!isUndefined(c) && typeof c == "function") {
          c(l)
        }
      },
      complete: function () {
        if (!isUndefined(b) && typeof b == "function") {
          b()
        }
        ajaxComplete()
      },
      error: function (n, l, m) {
        if (!isUndefined(g) && typeof g == "function") {
          g(l, m)
        }
      }
    })
  };
  this.get = function (i) {
    d("GET", i, e().replace("?", ""))
  };
  this.post = function (k, i, j) {
    if (k != null && !isUndefined(k)) {
      k.preventDefault()
    }
    d("POST", i + e(), j)
  };
  this.postForm = function (l, i, n) {
    var m = "form#" + n;
    var j = $(m);
    var k = j.serializeArray();
    this.post(l, i, k)
  }
};
var Workflow = (function (b, a, c) {
  Workflow = {};
  Workflow.navActionPrev = function () {
    a.getElementById("wf_do_previous").click();
    c(".progress-bar").removeClass("progress-bar").removeClass("progress-bar-success");
    return false
  };
  Workflow.navActionNext = function () {
    a.getElementById("wf_do_next").click();
    c(".progress-bar").removeClass("progress-bar").removeClass("progress-bar-success");
    return false
  };
  Workflow.navAction = function (d) {
    a.getElementById("wf_action_requested").value = d;
    a.forms[0].submit();
    c(".progress-bar").removeClass("progress-bar").removeClass("progress-bar-success");
    return false
  };
  return Workflow
})(this, this.document, jQuery);
document.onkeydown = function (b) {
  var a = b.keyCode ? b.keyCode : b.which;
  if (a == "13") {
    if ($("#wf_do_next").hasClass("no-script-click")) {} else {
      if ($("#overlay-temp").css("display") == "none") {
        document.getElementById("wf_do_next").click()
      }
    }
  }
};
$(document).ready(function () {
  var a = $("#workprogress").val() + "%";
  $("#workflow-progress .progress-bar").animate({
    width: a
  }, 1500);
  $("#resendOtp").click(function () {
    $("#otpBut").click()
  });
  $("#body_assistedacquisitionflow_cellphone-verification #wf_do_next").click(function () {
    $("#niussdMessage").modal().css("z-index", "9999999");
    $("#sessionExtendModal.modal").css("z-index", "99999999")
  })
});
setCaretPosition = function (d, b) {
  var c = d;
  c.value = c.value;
  if (c !== null) {
    if (c.createTextRange) {
      var a = c.createTextRange();
      a.move("character", b);
      a.select();
      return true
    } else {
      if (c.selectionStart || c.selectionStart === 0) {
        c.focus();
        c.setSelectionRange(b, b);
        return true
      } else {
        c.focus();
        return false
      }
    }
  }
};
$(".decimalFormat-6-2").on("keyup", function (a) {
  decimalFormat(a, 6, 2)
});
$(".decimalFormat-7-2").on("keyup", function (a) {
  decimalFormat(a, 7, 2)
});
$(".decimalFormat-8-2").on("keyup", function (a) {
  decimalFormat(a, 8, 2)
});
decimalFormat = function (l, o, h) {
  var b = new Array(8, 9, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 188, 190, 39, 37, 46, 189, 45, 35, 36, 144, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 109);
  if (!l) {
    l = window.event
  }
  var n = l.keyCode ? l.keyCode : l.which;
  if (n == 9) {
    return true
  }
  var a = false;
  for (i = 0; i < b.length; i++) {
    if (n == b[i] && !l.shiftKey) {
      a = true
    }
  }
  if (a == false) {
    l.returnValue = null;
    l.target.value = l.target.value.replace(/[^0-9,.]/g, "");
    if (l.preventDefault) {
      l.preventDefault()
    }
  }
  if (a) {
    var g = l.target;
    var j = g.selectionStart;
    var m = g.value.split(".");
    var c = m[0];
    var k = c.split(",").length - 1;
    c = c.replace(/[,]/g, "");
    if (c.length > o) {
      c = c.substring(0, o)
    }
    c = c.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var f = c.split(",").length - 1;
    j = j + (f - k);
    value = c;
    if (h > 0 && m.length > 1) {
      var d = m[1];
      if (d.length > h) {
        d = d.substring(0, h)
      }
      value = value + "." + d
    }
    g.value = value;
    setCaretPosition(g, j)
  }
};
$(document).ready(function () {
  initInfields();
  checkSelectVal()
});
var initInfields = function () {
  if (Modernizr.placeholder) {
    $(".infield").each(function () {
      var a = $(this),
        b = a.find("input, select, textarea");
      if (b.val() !== "") {
        a.addClass("show-label")
      }
      if (b.val() === "") {
        a.removeClass("show-label")
      }
      b.focus(function () {
        a.addClass("show-label")
      });
      b.blur(function () {
        if (b.val() === "") {
          a.removeClass("show-label")
        }
      });
      b.change(function () {
        if (b.val() !== "") {
          a.addClass("show-label")
        } else {
          a.removeClass("show-label")
        }
      })
    })
  } else {
    $(".infield").each(function () {
      var a = $(this),
        b = a.find("input, select, textarea");
      a.addClass("show-label");
      $("select").find("option[value='']").empty()
    })
  }
};
var HeartBeat = (function (h, j, e) {
  HeartBeat = {};
  var c, i, d = false;

  function l() {
    e.get("/heartbeat?kill=true", f)
  }

  function g() {
    h.clearInterval(i);
    c = h.setTimeout(l, 4 * 60 * 1000);
    e("#sessionExtendModalButton").click()
  }

  function a(m) {
    return (m === null) ? true : false
  }
  HeartBeat.beat = function () {
    b()
  };
  HeartBeat.start = function () {
    h.clearTimeout(c);
    HeartBeat.beat();
    i = h.setInterval(HeartBeat.beat, 30 * 1000);
    h.onload = m;
    h.onmousemove = m;
    h.onmousedown = m;
    h.onclick = m;
    h.onscroll = m;
    h.onkeypress = m;

    function m() {
      d = true
    }
  };
  HeartBeat.killSession = function () {
    l()
  };

  function f() {
    h.location.assign("/");
    setTimeout(function () {
      j.location.href = "/"
    }, 500);
    return false
  }

  function k(m) {
    if (m == "beatout") {
      g()
    }
    if (m == "timedout") {
      f()
    }
  }

  function b() {
    var m = new AjaxRequest();
    m.addParam("beat", d);
    m.callback.success(k);
    m.get("/heartbeat");
    d = false
  }
  return HeartBeat
})(this, this.document, jQuery);
$(document).ready(function () {
  HeartBeat.start()
});
$("#ffname").focusout(function () {
  $("#finitials").val(deriveInitials(this.value))
});

function deriveInitials(a) {
  var c = "";
  var b = a.split(" ");
  for (i in b) {
    c += b[i].substring(0, 1).toUpperCase()
  }
  return c
};
