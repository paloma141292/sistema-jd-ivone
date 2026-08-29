"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const ARQUIVO_ALUNOS = path.join(__dirname, "banco.json");
const ARQUIVO_ESTADO = path.join(__dirname, "dados-compartilhados.json");

function lerJSON(arquivo, padrao) {
  try {
    if (!fs.existsSync(arquivo)) return padrao;
    return JSON.parse(fs.readFileSync(arquivo, "utf8"));
  } catch (erro) {
    console.error(`Falha ao ler ${path.basename(arquivo)}:`, erro.message);
    return padrao;
  }
}

function salvarJSON(arquivo, valor) {
  fs.writeFileSync(arquivo, JSON.stringify(valor, null, 2), "utf8");
}

function chaveCompartilhavel(chave) {
  const nome = String(chave || "");
  if (!nome.startsWith("jd_")) return false;
  return ![
    "jd_sessao_usuario",
    "jd_usuario_logado",
    "jd_login_acesso_lembrado",
    "jd_acesso_lembrado"
  ].includes(nome);
}

function filtrarEstado(estado) {
  const saida = {};
  if (!estado || typeof estado !== "object" || Array.isArray(estado)) return saida;

  Object.entries(estado).forEach(([chave, valor]) => {
    if (chaveCompartilhavel(chave)) saida[chave] = String(valor ?? "");
  });

  return saida;
}

function responder(res, status, payload) {
  const corpo = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Private-Network": "true",
    "Cache-Control": "no-store",
    "Vary": "Origin"
  });
  res.end(corpo);
}

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    let bruto = "";
    req.on("data", bloco => {
      bruto += bloco;
      if (bruto.length > 8 * 1024 * 1024) {
        reject(new Error("Corpo excedeu o limite."));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!bruto) return resolve({});
      try { resolve(JSON.parse(bruto)); }
      catch (_) { resolve({}); }
    });
    req.on("error", reject);
  });
}

const servidor = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Private-Network": "true",
      "Access-Control-Max-Age": "600",
      "Vary": "Origin"
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      return responder(res, 200, { ok: true, servico: "JD Ivone - compartilhamento local", porta: PORT });
    }

    if (req.method === "GET" && url.pathname === "/api/state") {
      const estado = filtrarEstado(lerJSON(ARQUIVO_ESTADO, {}));
      return responder(res, 200, { ok: true, state: estado });
    }

    if (req.method === "POST" && url.pathname === "/api/state/merge") {
      const corpo = await lerCorpo(req);
      const atual = filtrarEstado(lerJSON(ARQUIVO_ESTADO, {}));
      const recebido = filtrarEstado(corpo?.state || {});
      const mesclado = { ...atual, ...recebido };
      salvarJSON(ARQUIVO_ESTADO, mesclado);
      return responder(res, 200, { ok: true, keys: Object.keys(mesclado).length });
    }

    if (req.method === "PUT" && url.pathname === "/api/state/item") {
      const corpo = await lerCorpo(req);
      const chave = String(corpo?.key || "");
      if (!chaveCompartilhavel(chave)) {
        return responder(res, 400, { ok: false, erro: "Chave não compartilhável." });
      }
      const estado = filtrarEstado(lerJSON(ARQUIVO_ESTADO, {}));
      estado[chave] = String(corpo?.value ?? "");
      salvarJSON(ARQUIVO_ESTADO, estado);
      return responder(res, 200, { ok: true });
    }

    if (req.method === "DELETE" && url.pathname === "/api/state/item") {
      const corpo = await lerCorpo(req);
      const chave = String(corpo?.key || "");
      if (!chaveCompartilhavel(chave)) {
        return responder(res, 400, { ok: false, erro: "Chave não compartilhável." });
      }
      const estado = filtrarEstado(lerJSON(ARQUIVO_ESTADO, {}));
      delete estado[chave];
      salvarJSON(ARQUIVO_ESTADO, estado);
      return responder(res, 200, { ok: true });
    }

    // Rotas legadas mantidas para não quebrar o protótipo existente.
    if (req.method === "GET" && url.pathname === "/alunos") {
      return responder(res, 200, lerJSON(ARQUIVO_ALUNOS, []));
    }

    if (req.method === "POST" && url.pathname === "/alunos") {
      const corpo = await lerCorpo(req);
      const dados = lerJSON(ARQUIVO_ALUNOS, []);
      dados.push(corpo);
      salvarJSON(ARQUIVO_ALUNOS, dados);
      return responder(res, 200, { mensagem: "Aluno cadastrado com sucesso!" });
    }

    return responder(res, 404, { ok: false, erro: "Rota não encontrada." });
  } catch (erro) {
    console.error(erro);
    return responder(res, 500, { ok: false, erro: "Falha interna do serviço local." });
  }
});

servidor.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("=============================================");
  console.log(" Sistema JD Ivone - compartilhamento local");
  console.log(` Serviço ativo na porta ${PORT}`);
  console.log(" Mantenha esta janela aberta durante os testes.");
  console.log("=============================================");
  console.log("");
});
