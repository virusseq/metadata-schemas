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

// Tool to aid in testing only
// populates the references from dictionary.json with the actual references, generates populated_dictionary.json
// allows for easy overwrite into clinical's sample-schema.json
import fs from "fs";
import dict from "./dictionary.json" assert { type: "json" };

const old = JSON.stringify(dict);

// References look like this : /#/scripts/donor/ensuredeceased
// This regex finds them
const regex = /"#\/.+?(?=\")"/g;

const replacer = (match) => {
  const strip = /#\//;
  const stripped = match.replace(strip, "").replace(/"/g, "");
  const refs = stripped.split("/");
  let replacement = dict.references;
  refs.forEach((element) => {
    if (!replacement[element]) {
      throw new Error(
        `Could not find element '${element}' in refs '${match}'.`
      );
    }
    replacement = replacement[element];
  });
  return JSON.stringify(replacement);
};

const newString = old.replace(regex, replacer);

fs.writeFileSync("./populated_dictionary.json", newString);
