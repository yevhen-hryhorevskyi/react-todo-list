class DomUtils {

    /**
     * Delete DOM element by id (if exists)
     * @param elementId - DOM element id
     * @return {Element} - deleted element
     */
    static deleteById(elementId) {
        const existingElement = document.getElementById(elementId);
        if (existingElement) {
            existingElement.parentNode.removeChild(existingElement);
        }
        return existingElement;
    }
}

export default DomUtils;