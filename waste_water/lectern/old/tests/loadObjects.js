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

/**
 * Combines the dummy data object with the test input data object, taking preference to the inputs fields.
 * Makes sure that the fields being passed to the test function actually exist.
 * @param {Object} dummy The object whose keys contain all the fields of the schema
 * @param {Object} inputs the object containing the fields and custom values for test input
 */
const loadObjects = (dummy, inputs) => {
  const doesfieldExist = (field) => {
    const doesExist = Object.keys(dummy).includes(field);
    if (!doesExist) {
      throw `the field name : '${field}' did not match the fields from the dummy schema: ${JSON.stringify(dummy, null, 4)}. 
            \nPlease ensure that the '${field}' field exists in the schema, and is spelled correctly.`;
    }
    return doesExist;
  };
  if (Object.keys(inputs).every(doesfieldExist)) {
    return {
      ...dummy,
      ...inputs,
    };
  } else return dummy;
};

module.exports = loadObjects;
