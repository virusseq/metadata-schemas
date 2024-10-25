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

// This script builds dummy data objects for each schema, based on the fields.
// This allows for the field names to populate automatically. Field data is empty.

import fs from "fs";
import path from "path";
const schemasFolder = path.join(__dirname, "../schemas");

/**
 * This returns a dummy object of a schema with all fields prepopulated to null
 * @param {Object} schemaName The exact name of the schema as it is in the /schemas folder
 */
const getSchemaDummy = (schemaName) => {
  try {
    fs.readFileSync(path.join(schemasFolder, `${schemaName}.json`), "utf-8");
  } catch (err) {
    throw `Something went wrong when trying to load in ${schemaName}.json from ${schemasFolder}. Please ensure the file exists and is spelled correctly.`;
  }
  const rawFileContents = fs.readFileSync(
    path.join(schemasFolder, `${schemaName}.json`),
    "utf-8"
  );
  const fileContents = JSON.parse(rawFileContents);
  const dummyData = {};
  fileContents.fields.forEach((field) => {
    dummyData[field.name] = null;
  });
  return dummyData;
};

module.exports = { getSchemaDummy };
