/*
 * Copyright (c) 2024 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 */

import inquirer from "inquirer";
import chalk from "chalk";

import fs from "fs";
const whitespace = 4;
const defaultName = "PCGL Data Dictionary";
const defaultVersion = "0.0";

import schemas from "./schemas/index.js";
import references from "./references/index.js";

async function promptName(versions) {
  console.log("\n");
  return new Promise((resolve) =>
    inquirer
      .prompt([
        {
          message: `Dictionary Name [${chalk.yellow(defaultName)}]:`,
          name: "name",
          type: "string",
        },
      ])
      .then((answers) => resolve(answers.name || defaultName))
  );
}
async function promptVersion(versions) {
  console.log("\n");
  return new Promise((resolve) =>
    inquirer
      .prompt([
        {
          message: `Dictionary Version [${chalk.yellow(defaultVersion)}]:`,
          name: "version",
          type: "string",
        },
      ])
      .then((answers) => resolve(answers.version || defaultVersion))
  );
}

async function run() {
  const name = await promptName();
  const version = await promptVersion();
  const dictionary = { name, version, references, schemas };

  fs.writeFileSync(
    "./dictionary.json",
    JSON.stringify(dictionary, null, whitespace)
  );
  console.log(dictionary);
}

run();
