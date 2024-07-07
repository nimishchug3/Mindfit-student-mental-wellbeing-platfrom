
export default function EditorCard({handleSubmit, handleImageChange, closeEditor }) {
    return (
        <div className='absolute'>
          <input type='file' name='profilePic' id='profilePic' onChange={handleImageChange} />
          <div onClick={handleSubmit}>Submit</div>

          <div>
            <button
                onClick={closeEditor}
            >Discard</button>
          </div>
        </div>
    )
}