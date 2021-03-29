/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
// global variables

var submitBTN_available = false;

var formFields = [
  {
    id: "full_name",
    hasError: false,
    box: document.getElementById("full_name_box"),
    pattern: "^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$",
    required: true,
    customValidation: false,
    name: "Nome Completo",
    element: document.getElementById("full_name"),
  },
  {
    id: "company",
    hasError: false,
    box: document.getElementById("company_box"),
    pattern: "^(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$",
    required: true,
    customValidation: false,
    name: "Empresa",
    element: document.getElementById("company"),
  },
  {
    id: "email",
    hasError: false,
    box: document.getElementById("email_box"),
    pattern: /\S+@\S+\.\S+/,
    required: true,
    customValidation: false,
    name: "E-mail",
    element: document.getElementById("email"),
  },
  {
    id: "phone",
    hasError: false,
    box: document.getElementById("phone_box"),
    pattern: "((10)|([1-9][1-9])) [2-9][0-9]{3}-[0-9]{4}",
    required: true,
    customValidation: true,
    name: "Telefone",
    element: document.getElementById("phone"),
  },
  {
    id: "description",
    hasError: false,
    box: document.getElementById("description_box"),
    pattern: /^(?!\s*$).+/,
    required: false,
    customValidation: false,
    name: "Mensagem",
    element: document.getElementById("description"),
  },
  {
    id: "lead_source",
    hasError: false,
    box: document.getElementById("lead_source_box"),
    pattern: "[^]*",
    required: true,
    customValidation: false,
    name: "lead_source",
    element: document.getElementById("lead_source"),
  },
];

var full_name = document.getElementById("full_name").value;
var company = document.getElementById("company").value;
var email = document.getElementById("email").value;
var phone = document.getElementById("phone").value;
var description = document.getElementById("description").value;
var lead_source = document.getElementById("lead_source").value;

window.addEventListener("DOMContentLoaded", (function (e) {
  formFields.map((function (fieldName) {
    document
      .getElementById(fieldName.id)
      .addEventListener("blur", validateField, false);
  }));
}));

function validateField(e) {
  var formField = formFields.find((function (x) {
    return x.id === e.srcElement.id;
  }));
  if (formField.customValidation == false) {
    var regex = new RegExp(formField.pattern);
    if (
      regex.test(e.srcElement.value) &&
      e.srcElement.value != "" &&
      e.srcElement.value != 0
    ) {
      formField.hasError = false;
      formField.box.classList.remove("error");
    } else if (formField.required === false) {
      formField.hasError = false;
      formField.box.classList.remove("error");
    } else {
      formField.hasError = true;
      formField.box.classList.add("error");
      var div = document.createElement("div");

      var messageHTML = document.getElementById("message_" + formField.name);
      if (!messageHTML) {
        div.className = "message";
        div.id = "message_" + formField.name;
        div.innerHTML =
          "O campo <strong>" + formField.name + "</strong> é inválido";
        formField.box
          .getElementsByClassName("validation-error-message")[0]
          .appendChild(div);
      }
    }
  } else {
    if (
      validarCNPJ(e.srcElement.value) ||
      telefone_validation(e.srcElement.value)
    ) {
      formField.hasError = false;
      formField.box.classList.remove("error");
    } else {
      formField.hasError = true;
      formField.box.classList.add("error");
      var div = document.createElement("div");

      var messageHTML = document.getElementById("message_" + formField.name);
      if (!messageHTML) {
        div.className = "message";
        div.id = "message_" + formField.name;
        div.innerHTML =
          "O campo <strong>" + formField.name + "</strong> é inválido";
        formField.box
          .getElementsByClassName("validation-error-message")[0]
          .appendChild(div);
      }
    }
  }
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  // Valida DVs
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

function telefone_validation(telefone) {
  //retira todos os caracteres menos os numeros
  telefone = telefone.replace(/\D/g, "");

  //verifica se tem a qtde de numero correto
  if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

  //Se tiver 11 caracteres, verificar se começa com 9 o celular
  if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9)
    return false;

  //verifica se não é nenhum numero digitado errado (propositalmente)
  for (var n = 0; n < 10; n++) {
    //um for de 0 a 9.
    //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
    //caractere a ser repetido
    if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n))
      return false;
  }
  //DDDs validos
  var codigosDDD = [
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    21,
    22,
    24,
    27,
    28,
    31,
    32,
    33,
    34,
    35,
    37,
    38,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    51,
    53,
    54,
    55,
    61,
    62,
    64,
    63,
    65,
    66,
    67,
    68,
    69,
    71,
    73,
    74,
    75,
    77,
    79,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
  ];
  //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
  if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1)
    return false;

  if (new Date().getFullYear() < 2017) return true;
  if (
    telefone.length == 10 &&
    [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1
  )
    return false;

  //se passar por todas as validações acima, então está tudo certo
  return true;
}

function sendForm() {
  // check all fields again
  formFields.map((function (fieldName) {
    fieldName.element.focus();
    fieldName.element.blur();
  }));

  function checkError(err) {
    return err === true;
  }

  var formHasError = false;
  formFields.map((function (x) {
     formHasError = checkError(x.hasError);
   }));

  if (formHasError) {
    sendToast(
      true,
      "Erro ao enviar o contato, todos os campos devem estar validados"
    );
    return;
  }

  if (!formHasError) {
    document.getElementById("formContact").submit();
  }

  var myForm = document.getElementById('formContact');
  formData = new FormData(myForm);
  
  
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8', true);
  
  
  
  xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
  
      if (this.status == 200) {
          sendToast(false, "Contato enviado com sucesso, em breve iremos responder!")
      } else {
          sendToast(true, "Erro ao enviar o contato, tente novamente")
      }
  
  };
  
  
  xhr.send(formData);

  }

function sendLead() {
  var name = document.getElementById("nameLead").value;
  var email = document.getElementById("emailLead").value;

  if (!name || name == "" || !email || email == "") {
    sendToast(true, "Erro ao enviar cadastro, todos os campos são necessários");
    return;
  }

  sendToast(
    false,
    "Parabéns, você foi cadastrado na lista de  entregáveis de UX!"
  );
}

PureMask.format(".telefone", false);
PureMask.format(".cnpj", false);

function sendToast(error, message) {
  var backgroundColor = "#0079c8";

  if (error) {
    backgroundColor = "linear-gradient(to right, #ff0000 20%, #ff0000 100%";
  }

  Toastify({
    text: message,
    duration: 3000,
    // newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    backgroundColor: backgroundColor,
    stopOnFocus: true, // Prevents dismissing of toast on hover
    onClick: function () {}, // Callback after click
  }).showToast();
  if (!error) {
    document.getElementById("formContact").reset();
  }

  // document.getElementById("formLead").reset();
}

function moveToElement(elementName, menuChange) {
  var checkbox = document.getElementById("menu-btn");
  checkbox.checked = false;
  var moveTo = new MoveTo({
    tolerance: 100,
  });

  var target = document.getElementById(elementName);

  moveTo.move(target);

  if (menuChange) {
    changeMenuStatus();
  }
}

function changeMenuStatus() {
  var menu = document.getElementById("header");
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
  } else {
    menu.classList.add("active");
  }
}
AOS.init();

var onloadCallback = function () {
  grecaptcha.render(document.getElementById("recaptchaPlace"), {
    sitekey: "6LfaA_QUAAAAAA3yANpQMT_bA4BZVumVi8RmOaXd",
    callback: enableBtn,
  });
};

function enableBtn(token) {
  submitBTN_available = true;
  document.getElementById("submitBTN").classList.remove("disabled");
  document.getElementById("submitBTN").classList.add("available");
}
var url = new URL(window.location.href);
if (url.searchParams.get("formEnviado")) {
  sendToast(false, "Contato enviado com sucesso!");
}
