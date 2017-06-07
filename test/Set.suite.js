'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');

global.window = global;

suite('Set', () => {
    delete window.Set;
    require('../solutions/ArraySlice');
    require('../solutions/Set');

    const initialArguments = [1, 2, 3, 4, 1, 2, 3, 5, 6, 3, 3, 2];
    const itemsToAdd = initialArguments.map(i => i + 10);
    const itemsToAdd2 = initialArguments.map(i => i + 20);
    const itemsToAdd3 = initialArguments.map(i => i + 30);
    const clearRepeats = arr => arr.filter((item, ind) => arr.indexOf(item) === ind);

    test(`should allow to add arguments as initial elements of created set`, () => {
        // should allow construction also without elements
        expect(new Set()).to.be.instanceOf(Set);

        const s = new Set(...initialArguments);
        const clearInitialValues = clearRepeats(initialArguments);

        expect(s.length).to.equal(clearInitialValues.length);
        expect([...s]).to.deep.equal(clearInitialValues);
    });

    test(`concat should return a new set which is concatenation of itself and arguments`, () => {
        let s = new Set(...initialArguments);

        let rightS = new Set(...initialArguments, Infinity, ...itemsToAdd, ...itemsToAdd2, ...itemsToAdd3);
        rightS.push(rightS);

        s = s.concat(Infinity, itemsToAdd, itemsToAdd2, itemsToAdd3, [rightS]);

        expect(s).to.deep.equal(rightS);
    });

    test(`concat should return a Set`, () => {
        let s = new Set(...initialArguments);

        expect(s.concat(Infinity, itemsToAdd)).to.be.instanceOf(Set);
    });

    test(`push should not allow repeats`, () => {
        const s = new Set(...initialArguments);
        let rightS = new Set(...initialArguments);

        s.push(...initialArguments);
        expect(s).to.deep.equal(rightS);

        s.push(Infinity);
        rightS = new Set(...s, Infinity);
        expect(s).to.deep.equal(rightS);

        s.push(...itemsToAdd);
        rightS = new Set(...s, ...itemsToAdd);
        expect(s).to.deep.equal(rightS);

        s.push(...itemsToAdd2);
        rightS = new Set(...s, ...itemsToAdd2);
        expect(s).to.deep.equal(rightS);

        s.push(...itemsToAdd3);
        rightS = new Set(...s, ...itemsToAdd3);
        expect(s).to.deep.equal(rightS);
    });

    test(`push should return the final length of set`, () => {
        const s = new Set(...initialArguments);

        expect(s.push(...itemsToAdd)).to.equal(s.length);
    });

    test(`unshift should not allow repeats`, () => {
        const s = new Set(...initialArguments);
        let rigthtS = new Set(...initialArguments);

        s.unshift(...initialArguments);
        expect(s).to.deep.equal(rigthtS);

        s.unshift(Infinity);
        rigthtS = new Set(Infinity, ...s);
        expect(s).to.deep.equal(rigthtS);

        s.unshift(...itemsToAdd);
        rigthtS = new Set(...itemsToAdd, ...s);
        expect(s).to.deep.equal(rigthtS);

        s.unshift(...itemsToAdd2);
        rigthtS = new Set(...itemsToAdd2, ...s);
        expect(s).to.deep.equal(rigthtS);

        s.unshift(...itemsToAdd3);
        rigthtS = new Set(...itemsToAdd3, ...s);
        expect(s).to.deep.equal(rigthtS);
    });

    test(`unshift should return the final length of set`, () => {
        const s = new Set(...initialArguments);

        expect(s.unshift(...itemsToAdd)).to.equal(s.length);
    });

    test(`splice should not allow repeats in items of insertion`, () => {
        let s = new Set(...initialArguments);
        let rigthtS = new Set(...initialArguments);

        s.splice(1, 0, ...initialArguments);
        expect(s).to.deep.equal(rigthtS);

        let sAsArray = [...s];
        s.splice(1, 4);
        sAsArray.splice(1, 4);
        expect(s).to.deep.equal(sAsArray);

        s = new Set(...initialArguments);
        sAsArray = [...s];
        s.splice(1, 4, ...itemsToAdd);
        sAsArray.splice(1, 4, ...itemsToAdd);
        expect(s).to.deep.equal(new Set(...sAsArray));
    });

    test(`splice should return the subset removed`, () => {
        let s = new Set(...initialArguments);

        let ret = s.splice(1, 0, ...initialArguments);
        expect(ret).to.be.instanceOf(Set);
        expect(ret).to.be.empty;

        let sAsArray = [...s];
        ret = s.splice(1, 4);
        expect(ret).to.be.instanceOf(Set);
        expect(ret).to.deep.equal(sAsArray.splice(1, 4));

        s = new Set(...initialArguments);
        sAsArray = [...s];
        ret = s.splice(1, 4, ...itemsToAdd);
        expect(ret).to.be.instanceOf(Set);
        expect(ret).to.deep.equal(sAsArray.splice(1, 4, ...itemsToAdd));
    });

    test(`for-in should iterate only over elements of set`, () => {
        let s = new Set(...initialArguments);

        for(var i = 0; i < s.length; s++) {
            expect(s.propertyIsEnumerable(i)).to.be.true;
        }

        for(var key in s) {
            key = +key;
            expect(key | 0).to.equal(key);
            expect(key).to.be.above(-1);
            expect(key).to.be.below(s.length);
        }
    });
});
