function* sequenceGeneratorFactory() {
    let index = 0;
    yield index++;
}

const sequenceGenerator = sequenceGeneratorFactory();

class SequenceUtil {

    /**
     * Produce the unique values during the
     * browser session by giving as a result a new integer
     * greater that previous one with a step = 1.
     *
     * @return {integer}
     */
    static getNext() {
        return sequenceGenerator.next().value;
    }

}

export default SequenceUtil;