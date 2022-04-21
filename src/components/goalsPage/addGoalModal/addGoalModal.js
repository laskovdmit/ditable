import React, { useContext, useState } from 'react';
import ModalWrap from '../../modalWrap';
import { FirebaseServiceContext } from '../../serviceContext/serviceContext';

const AddGoalModal = ({showLoading, showError, error, display, closedFunc, ...props}) => {
    const firebaseService = useContext(FirebaseServiceContext);

    if (error) {
        closedFunc(false);
    }

    return (
        <ModalWrap {...props} closedFunc={closedFunc} display={display} width={'500px'} height={'410px'}>
            <h2>Добавить новую цель</h2>
        </ModalWrap>
    );
};

export default AddGoalModal;